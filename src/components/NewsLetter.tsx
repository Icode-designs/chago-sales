import { NewsLetterBox } from "@/styles/components/footer.styles";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import React from "react";

const NewsLetter = () => {
  return (
    <NewsLetterBox>
      <article>
        <div>
          <h2>join our news letter</h2>
          <p>
            Sign up for our newsletter and stay updated on the best deals and
            trends.
          </p>
        </div>
        <FlexBox $gap={24}>
          <input type="text" placeholder="Enter email address" />
          <CustomButton>Submit</CustomButton>
        </FlexBox>
      </article>
    </NewsLetterBox>
  );
};

export default NewsLetter;
