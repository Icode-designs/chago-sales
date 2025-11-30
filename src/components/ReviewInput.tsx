import { ReviewInputBox } from "@/styles/components/productDetails";
import { CustomButton } from "@/styles/components/ui.Styles";
import React from "react";

const ReviewInput = () => {
  return (
    <ReviewInputBox>
      <h3>leave a review</h3>
      <textarea name="review" id="review" placeholder="type your review" />
      <div>
        <CustomButton>submit</CustomButton>
      </div>
    </ReviewInputBox>
  );
};

export default ReviewInput;
