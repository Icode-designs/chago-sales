import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ReactElement } from "react";
import Product from "@/types/productsType";

export interface Reviews {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export function extractRating(product: Product) {
  if (!product) return null;
  return {
    5: product.customerReviews?.filter((rev) => rev.stars === 5).length || 0,
    4: product.customerReviews?.filter((rev) => rev.stars === 4).length || 0,
    3: product.customerReviews?.filter((rev) => rev.stars === 3).length || 0,
    2: product.customerReviews?.filter((rev) => rev.stars === 2).length || 0,
    1: product.customerReviews?.filter((rev) => rev.stars === 1).length || 0,
  } as Reviews;
}

function calculateAverageRating(reviews: Reviews): number {
  const reviewEntries = Object.entries(reviews);
  if (!reviews || reviewEntries.length === 0) return 0;

  const totalStars = reviewEntries.reduce(
    (acc, [star, count]) => acc + Number(star) * count,
    0
  );
  const totalReviews = reviewEntries.reduce((acc, [, count]) => acc + count, 0);
  return totalReviews === 0 ? 0 : totalStars / totalReviews;
}

function numberToStars(
  rating: number | Reviews,
  maxStars = 5,
  size = 16,
  color = "gold"
): ReactElement[] {
  // Calculate average if reviews array is passed
  const avgRating =
    typeof rating === "number" ? rating : calculateAverageRating(rating);

  const stars: ReactElement[] = [];
  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 >= 0.5;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} size={size} color={color} />);
  }

  // Add half star if needed
  if (hasHalfStar && fullStars < maxStars) {
    stars.push(<FaStarHalfAlt key="half" size={size} color={color} />);
  }

  // Add empty stars
  for (let i = stars.length; i < maxStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} size={size} color={color} />);
  }

  return stars;
}

function sumRatings(rating: {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}): number {
  return Object.values(rating).reduce((sum, val) => sum + val, 0);
}

export { numberToStars, sumRatings };
