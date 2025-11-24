"use client";
import { RootState } from "@/store/store";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import {
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebaseCl";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FirebaseError } from "firebase/app";

export interface ReviewData {
  userId: string;
  user: string;
  stars: number;
  comment: string;
  createdAt: Timestamp;
}

const UserReview = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    if (rating === 0) {
      alert("Please select a star rating before submitting.");
      return;
    }

    if (!user) {
      alert("You must be logged in to leave a review.");
      return;
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const reviewText = formData.get("review") as string;

    if (!reviewText || reviewText.trim().length === 0) {
      alert("Please write a review before submitting.");
      return;
    }

    setLoading(true);

    try {
      const productRef = doc(db, "products", productId);

      // Check if product exists and if user already reviewed
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        alert("Product not found. Please refresh and try again.");
        return;
      }

      const existingReviews = productSnap.data()?.customerReviews || [];
      const hasReviewed = existingReviews.some(
        (review: ReviewData) => review.userId === user.uid
      );

      if (hasReviewed) {
        alert("You have already reviewed this product.");
        return;
      }

      // Create review object
      const newReview: ReviewData = {
        userId: user.uid,
        user: `${user.firstName} ${user.lastName}`,
        stars: rating,
        comment: reviewText.trim(),
        createdAt: Timestamp.now(),
      };

      // Update product document - append to customerReviews array
      await updateDoc(productRef, {
        customerReviews: arrayUnion(newReview),
      });

      alert("Review submitted successfully!");

      // Reset form
      setRating(0);
      const form = e.currentTarget as HTMLFormElement;
      form.reset();
    } catch (err: unknown) {
      console.error("Error submitting review:", err);

      // More specific error messages
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "not-found":
            alert("Product not found. Please refresh and try again.");
            break;
          case "permission-denied":
            alert("You don't have permission to review this product.");
            break;
          case "unavailable":
            alert("Service temporarily unavailable. Please try again later.");
            break;
          default:
            alert("Failed to submit review. Please try again.");
        }
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } finally {
      setLoading(false); // ✅ Always reset loading state
    }
  }

  // Helper function to render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => setRating(starValue)}
          disabled={loading}
          aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
        >
          {rating >= starValue ? (
            <FaStar size={20} color="gold" />
          ) : (
            <FaRegStar size={20} color="gold" />
          )}
        </button>
      );
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>Leave Review</h2>
        <fieldset disabled={loading}>
          <FlexBox $gap={8}>
            <p>Rate Product: </p>
            <FlexBox $gap={4}>{renderStars()}</FlexBox>
            {rating > 0 && (
              <span>
                ({rating} star{rating > 1 ? "s" : ""})
              </span>
            )}
          </FlexBox>

          <div>
            <label htmlFor="review">Your Review</label>
            <textarea
              name="review"
              id="review"
              cols={30}
              rows={10}
              placeholder="Write your review here..."
              required
              minLength={10}
            />
          </div>
        </fieldset>
        <CustomButton
          type="submit"
          $variant="extended"
          disabled={loading || rating === 0}
        >
          {loading ? "Submitting..." : "Add Review"}
        </CustomButton>
      </form>
    </section>
  );
};

export default UserReview;
