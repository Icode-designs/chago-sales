"use client";
import { AppDispatch, RootState } from "@/store/store";
import { Column, FormImages } from "@/styles/components/ui.Styles";
import {
  ImageForm,
  StyledImagePlaceholder,
} from "@/styles/components/User.styles";
import React, { useState, useEffect } from "react";
import { FaImage, FaPen } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseCl"; // Adjust import path
import { updateUserData } from "@/store/slices/userSlice"; // Adjust import path

const UserLogo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const image = user?.photoURL;

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      return;
    }

    // Cleanup old preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    // Generate preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Auto-upload when file is selected
    handleLogoUpdate(file);
  };

  async function handleLogoUpdate(file: File) {
    if (!user?.uid) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("images", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
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

      const imageUrl = urls.images[0];

      // Update user document in Firebase
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        photoURL: imageUrl,
      });

      // Update Redux store
      dispatch(
        updateUserData({
          ...user,
          photoURL: imageUrl,
        })
      );

      alert("Logo updated successfully!");
    } catch (err) {
      console.error("Logo update error:", err);
      alert(
        `Failed to update logo: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveImage() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  }

  return (
    <Column>
      <StyledImagePlaceholder>
        {loading ? (
          <div>Uploading...</div>
        ) : previewUrl ? (
          <FormImages src={previewUrl} alt="vendor logo preview" />
        ) : image ? (
          <FormImages src={image} width={200} height={200} alt="vendor logo" />
        ) : (
          <FaImage size={48} />
        )}
      </StyledImagePlaceholder>

      <ImageForm>
        <label htmlFor="image-input">
          {loading ? "Uploading..." : "Edit logo"} <FaPen />
        </label>
        <input
          type="file"
          hidden
          id="image-input"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
      </ImageForm>

      {previewUrl && !loading && (
        <button
          type="button"
          onClick={handleRemoveImage}
          style={{ marginTop: "8px" }}
        >
          Cancel
        </button>
      )}
    </Column>
  );
};

export default UserLogo;
