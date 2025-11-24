import React from "react";
import { ReviewData } from "./UserReview";
import { CustomerReviews } from "@/styles/components/productDetails";
import { numberToStars } from "@/utils/ratings";
import { FlexBox } from "@/styles/components/ui.Styles";

const ProductReviews = ({ reviews }: { reviews: ReviewData[] }) => {
  return (
    <CustomerReviews>
      {reviews.map((rev, index) => (
        <article key={index}>
          <p>{rev.comment}</p>
          <FlexBox $gap={8} $justifyContent="center" $width="100%">
            {numberToStars(rev.stars)}
          </FlexBox>
          <h3>{rev.user}</h3>
        </article>
      ))}
    </CustomerReviews>
  );
};

export default ProductReviews;
