"use client";
import { AppDispatch, RootState } from "@/store/store";
import Product, { SPECS } from "@/types/productsType";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseCl"; // Adjust import path
import { updateProduct } from "@/store/slices/productsSlice"; // Adjust import path
import { CATEGORIES } from "@/utils/imageImport"; // Adjust import path
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UserContent } from "@/styles/components/User.styles";
import {
  Column,
  CustomButton,
  FlexBox,
  FormImages,
  ImageGrid,
} from "@/styles/components/ui.Styles";

// Styled components - adjust these imports based on your setup

const EditProduct = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.productId;

  const products = useSelector((state: RootState) => state.products.products);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const selectedProduct: Product | undefined = products.find(
    (prod) => prod.id === id
  );

  // Initialize state with existing product data
  const [specs, setSpecs] = useState<SPECS[]>(
    selectedProduct?.specifications || [{ spec: "", detail: "" }]
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewURLs, setNewPreviewURLs] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    selectedProduct?.images || []
  );
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Redirect if product not found or user is not the seller
  useEffect(() => {
    if (!selectedProduct) {
      alert("Product not found");
      router.push("/user/products");
      return;
    }

    if (selectedProduct.sellerId !== user?.uid) {
      alert("You don't have permission to edit this product");
      router.push("/user/products");
    }
  }, [selectedProduct, user, router]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      newPreviewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviewURLs]);

  // Update specs when product changes
  useEffect(() => {
    if (selectedProduct?.specifications) {
      setSpecs(selectedProduct.specifications);
    }
  }, [selectedProduct]);

  function addSpecification() {
    setSpecs((prevSpecs) => [...prevSpecs, { spec: "", detail: "" }]);
  }

  function removeSpecification(index: number) {
    setSpecs((prevSpecs) => prevSpecs.filter((_, i) => i !== index));
  }

  function handleSpecChange(
    index: number,
    field: "spec" | "detail",
    value: string
  ) {
    setSpecs((prevSpecs) =>
      prevSpecs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  const MAX_FILES = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate image types
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
      alert("Only image files are allowed.");
      return;
    }

    // Check total images (existing + new)
    const totalImages = existingImages.length + imageFiles.length;
    if (totalImages > MAX_FILES) {
      alert(`You can only have up to ${MAX_FILES} images total.`);
      return;
    }

    // Cleanup old preview URLs
    newPreviewURLs.forEach((url) => URL.revokeObjectURL(url));

    setNewImages(imageFiles);

    // Generate previews
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setNewPreviewURLs(urls);
  };

  function handleRemoveNewImage(index: number) {
    URL.revokeObjectURL(newPreviewURLs[index]);
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewPreviewURLs(newPreviewURLs.filter((_, i) => i !== index));
  }

  function handleRemoveExistingImage(index: number) {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("product-title") as string;
    const category = formData.get("product-category") as string;
    const price = formData.get("product-price") as string;
    const productStock = formData.get("product-stock") as string;
    const description = formData.get("product-desc") as string;

    // Validate specifications
    const validSpecs = specs.filter((s) => s.spec.trim() && s.detail.trim());
    if (validSpecs.length === 0) {
      alert("Add at least one complete product specification");
      return;
    }

    // Check if we have at least one image (existing or new)
    if (existingImages.length === 0 && newImages.length === 0) {
      alert("Add at least one product image");
      return;
    }

    setLoading(true);
    let newImageUrls: string[] = [];

    try {
      // Upload new images if any
      if (newImages.length > 0) {
        const imagesFormData = new FormData();
        newImages.forEach((file) => {
          imagesFormData.append("images", file);
        });

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: imagesFormData,
        });

        if (!uploadRes.ok) {
          throw new Error(`Upload failed: ${uploadRes.statusText}`);
        }

        const { urls } = await uploadRes.json();

        if (
          !urls ||
          !urls.images ||
          !Array.isArray(urls.images) ||
          urls.images.length === 0
        ) {
          throw new Error("Invalid response from upload API");
        }

        newImageUrls = urls.images;
      }

      // Combine existing images with new ones
      const allImageUrls = [...existingImages, ...newImageUrls];

      // Prepare updated product data
      const updatedProductData: Partial<Product> = {
        sellerId: user?.uid as string,
        category,
        title,
        price,
        description,
        productStock,
        specifications: validSpecs,
        images: allImageUrls,
      };

      // Update in Firebase
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedProductData);

      // Update Redux store
      dispatch(
        updateProduct({
          id,
          updates: updatedProductData,
        })
      );

      alert("Product updated successfully!");
      router.push(`/user/product-details/${id}`);
    } catch (err) {
      console.error("Product update error:", err);
      alert(
        `Failed to update product: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  const categories = Object.entries(CATEGORIES);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <UserContent>
      <form onSubmit={handleSubmit} ref={formRef}>
        <fieldset disabled={loading}>
          <legend>Edit Product</legend>

          <div>
            <label htmlFor="product-title">Product Title</label>
            <input
              type="text"
              id="product-title"
              name="product-title"
              placeholder="Enter product title"
              defaultValue={selectedProduct.title}
              required
            />
          </div>

          <div>
            <label htmlFor="product-category">Category</label>
            <select
              id="product-category"
              name="product-category"
              defaultValue={selectedProduct.category}
              required
            >
              {categories.map(([name], i) => (
                <option key={i} value={name}>
                  {name.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <FlexBox $gap={16} $variant="secondary">
            <div>
              <label htmlFor="product-price">Price</label>
              <input
                type="number"
                id="product-price"
                name="product-price"
                placeholder="Enter product price"
                defaultValue={selectedProduct.price}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label htmlFor="product-stock">Amount in stock</label>
              <input
                type="number"
                id="product-stock"
                name="product-stock"
                placeholder="Enter product stock"
                defaultValue={selectedProduct.productStock}
                min="0"
                required
              />
            </div>
          </FlexBox>

          <div>
            <label htmlFor="product-description">Description</label>
            <textarea
              name="product-desc"
              id="product-description"
              placeholder="Enter product description"
              defaultValue={selectedProduct.description}
              rows={7}
              required
            />
          </div>

          <fieldset>
            <h2>Specifications</h2>
            {specs.map((specification, i) => (
              <Column key={i}>
                <FlexBox $gap={16} $alignItems="end">
                  <div>
                    <label htmlFor={`spec-${i}`}>Specification</label>
                    <input
                      type="text"
                      placeholder="Enter Spec"
                      value={specs[i].spec}
                      onChange={(e) =>
                        handleSpecChange(i, "spec", e.target.value)
                      }
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSpecification(i)}
                    disabled={specs.length === 1}
                  >
                    <IoTrashBin size={40} color="var(--col-300)" />
                  </button>
                </FlexBox>
                <div>
                  <label htmlFor={`spec-detail-${i}`}>Details</label>
                  <textarea
                    placeholder="Enter Spec details"
                    value={specs[i].detail}
                    rows={3}
                    onChange={(e) =>
                      handleSpecChange(i, "detail", e.target.value)
                    }
                  />
                </div>
              </Column>
            ))}

            <button type="button" className="google" onClick={addSpecification}>
              Add Specification
            </button>
          </fieldset>

          <h3>Current Images</h3>
          <ImageGrid>
            {existingImages.map((url, i) => (
              <div key={`existing-${i}`}>
                <FormImages
                  width={500}
                  height={500}
                  src={url}
                  alt="existing-product-image"
                />
                <button
                  type="button"
                  className="delete"
                  onClick={() => handleRemoveExistingImage(i)}
                >
                  <IoTrashBin size={24} color="var(--col-300)" />
                </button>
              </div>
            ))}
          </ImageGrid>

          {newPreviewURLs.length > 0 && (
            <>
              <h3>New Images to Upload</h3>
              <ImageGrid>
                {newPreviewURLs.map((url, i) => (
                  <div key={`new-${i}`}>
                    <FormImages
                      width={500}
                      height={500}
                      src={url}
                      alt="new-product-image"
                    />
                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleRemoveNewImage(i)}
                    >
                      <IoTrashBin size={24} color="var(--col-300)" />
                    </button>
                  </div>
                ))}
              </ImageGrid>
            </>
          )}

          <div>
            <label htmlFor="select-images">
              Add More Images <FaPen />
            </label>
            <input
              type="file"
              id="select-images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={existingImages.length + newImages.length >= MAX_FILES}
            />
            <small>
              {existingImages.length + newImages.length} / {MAX_FILES} images
            </small>
          </div>

          <FlexBox $gap={16}>
            <CustomButton
              $variant="extended"
              type="button"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </CustomButton>
            <CustomButton $variant="extended" type="submit" disabled={loading}>
              {loading ? "Updating Product..." : "Update Product"}
            </CustomButton>
          </FlexBox>
        </fieldset>
      </form>
    </UserContent>
  );
};

export default EditProduct;
