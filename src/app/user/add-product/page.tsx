"use client";
import { db } from "@/lib/firebaseCl";
import { addProduct } from "@/store/slices/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  Column,
  CustomButton,
  FlexBox,
  FormImages,
  ImageGrid,
} from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import Product from "@/types/productsType";
import { CATEGORIES } from "@/utils/imageImport";
import { addDoc, collection, getDoc } from "firebase/firestore";

import React, { useState, useEffect, useRef } from "react";
import { FaPen } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [specs, setSpecs] = useState<{ spec: string; detail: string }[]>([
    {
      spec: "",
      detail: "",
    },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewURLs]);

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

    // Validate max files
    if (imageFiles.length > MAX_FILES) {
      alert(`You can only select up to ${MAX_FILES} images.`);
      return;
    }

    // Cleanup old preview URLs
    previewURLs.forEach((url) => URL.revokeObjectURL(url));

    setImages(imageFiles);

    // Generate previews
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewURLs(urls);
  };

  function handleRemoveImage(index: number) {
    // Cleanup the specific preview URL
    URL.revokeObjectURL(previewURLs[index]);

    setImages(images.filter((_, i) => i !== index));
    setPreviewURLs(previewURLs.filter((_, i) => i !== index));
  }

  function resetForm() {
    setSpecs([{ spec: "", detail: "" }]);
    setImages([]);
    previewURLs.forEach((url) => URL.revokeObjectURL(url));
    setPreviewURLs([]);
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
    if (validSpecs.length <= 0) {
      alert("Add at least one complete product specification");
      return;
    }

    if (images.length <= 0) {
      alert("Add at least one product image");
      return;
    }

    setLoading(true);
    let imageUrls: string[] = [];

    try {
      const imagesFormData = new FormData();
      images.forEach((file) => {
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

      // ADD THIS VALIDATION
      if (
        !urls ||
        !urls.images ||
        !Array.isArray(urls.images) ||
        urls.images.length === 0
      ) {
        throw new Error("Invalid response from upload API");
      }

      imageUrls = urls.images;
    } catch (err) {
      console.error("Image upload error:", err);
      alert(
        `Failed to upload images: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setLoading(false);
      return;
    }

    const productData: Product = {
      sellerId: user?.uid as string,
      category,
      title,
      price,
      description,
      productStock,
      specifications: validSpecs, // Use validated specs
      images: imageUrls,
    };

    try {
      const productRef = await addDoc(collection(db, "products"), productData);
      const productSnap = await getDoc(productRef);

      const savedProduct = {
        id: productRef.id,
        ...productSnap.data(),
      };

      console.log("product to be Added" + savedProduct);

      dispatch(addProduct(savedProduct as Product));

      // Show success message
      alert("Product added successfully!");

      // Reset form
      formRef.current?.reset();
      resetForm();
    } catch (err) {
      console.error("Product upload error:", err);
      alert(
        `Failed to add product: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false); // FIXED: Always reset loading state
    }
  }

  const categories = Object.entries(CATEGORIES);

  return (
    <UserContent>
      <form onSubmit={handleSubmit} ref={formRef}>
        <fieldset disabled={loading}>
          <legend>Add New Product</legend>
          <div>
            <label htmlFor="product-title">Product Title</label>
            <input
              type="text"
              id="product-title"
              name="product-title"
              placeholder="Enter product title"
              required
            />
          </div>
          <div>
            <label htmlFor="product-category">Category</label>
            <select id="product-category" name="product-category" required>
              {categories.map(([name], i) => (
                <option key={i}>{name.replace(/-/g, " ")}</option>
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
          <ImageGrid>
            {previewURLs.map((url, i) => (
              <div key={i}>
                <FormImages
                  width={500}
                  height={500}
                  src={url}
                  alt="product-image"
                />
                <button
                  type="button"
                  className="delete"
                  onClick={() => handleRemoveImage(i)}
                >
                  <IoTrashBin size={24} color="var(--col-300)" />
                </button>
              </div>
            ))}
          </ImageGrid>
          <div>
            <label htmlFor="select-images">
              Select images <FaPen />
            </label>
            <input
              type="file"
              id="select-images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <CustomButton $variant="extended" type="submit" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </CustomButton>
        </fieldset>
      </form>
    </UserContent>
  );
};

export default Page;
