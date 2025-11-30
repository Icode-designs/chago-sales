"use client";
import React from "react";
import OrderSummary from "@/components/OrderSummary";
import {
  StyledCheckoutField,
  StyledFieldGrid,
} from "@/styles/components/checkout.styles";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";

const CheckoutForm = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  }
  return (
    <form onSubmit={handleSubmit}>
      <FlexBox
        $justifyContent="space-between"
        $gap={40}
        $alignItems="start"
        $variant="secondary"
      >
        <StyledFieldGrid $gap={50}>
          <StyledCheckoutField>
            <h2>1. Delivery Address</h2>
            <div>
              <div>
                <label htmlFor="tel">phone number</label>
                <input
                  type="tel"
                  name="phone-number"
                  id="tel"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                />
              </div>
              <FlexBox $gap={16} $variant="secondary">
                <div>
                  <label htmlFor="city">city</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label htmlFor="state">state</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                  />
                </div>
              </FlexBox>
            </div>
          </StyledCheckoutField>
          <StyledCheckoutField>
            <h2>2. card details</h2>
            <div>
              <div>
                <label htmlFor="card-number">card number</label>
                <input
                  type="number"
                  name="card--number"
                  id="card-number"
                  placeholder="Enter card number"
                />
              </div>
              <div>
                <label htmlFor="card-holder-name">card holder name</label>
                <input
                  type="text"
                  name="card--holder-name"
                  id="card-holder-name"
                  placeholder="Enter card holder name"
                />
              </div>
              <FlexBox $gap={16} $variant="secondary">
                <div>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="Enter CVV"
                  />
                </div>
                <div>
                  <label htmlFor="card-expiry-date">expiry date</label>
                  <input
                    type="text"
                    name="card--expiry-date"
                    id="card-expiry-date"
                    placeholder="Enter expiry date"
                  />
                </div>
              </FlexBox>
            </div>
          </StyledCheckoutField>
        </StyledFieldGrid>
        <StyledFieldGrid $gap={32}>
          <OrderSummary />
          <CustomButton $variant="extended" type="submit">
            Place order
          </CustomButton>
        </StyledFieldGrid>
      </FlexBox>
    </form>
  );
};

export default CheckoutForm;
