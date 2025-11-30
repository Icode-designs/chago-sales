"use client";
import pxTorem from "@/utils/pxToRem";
import styled from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledProductsList = styled.section`
  background-color: var(--col-100);
  border-radius: var(--border-radius);
  padding: ${pxTorem(40)} ${pxTorem(16)};
  width: 100%;
`;

export const StyledFilter = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--col-100);
  width: ${({ $isOpen }) => ($isOpen ? "100%" : pxTorem(60))};
  height: ${({ $isOpen }) =>
    $isOpen ? `calc(100vh - ${pxTorem(82)})` : pxTorem(60)};
  z-index: 20;
  transition: all 0.4s ease, height 0.4s ease, padding 0.3s ease;
  padding: ${pxTorem(16)};
  padding-top: 0;
  border-radius: 0 ${pxTorem(12)} ${pxTorem(12)} 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer / Edge (old) */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  > div:nth-of-type(1) {
    width: 100%;
    position: sticky;
    background-color: var(--col-100);
    top: 0;
    left: 0;
    padding-top: ${pxTorem(16)};
    > button {
      svg {
        font-size: 24px;
      }
    }
  }

  @media ${QUERY.TABLET} {
    width: ${({ $isOpen }) => ($isOpen ? "50%" : pxTorem(60))};
    height: ${({ $isOpen }) =>
      $isOpen ? `calc(100vh - ${pxTorem(112)})` : pxTorem(60)};
  }
`;

export const StyledFilterForm = styled.form`
  padding: ${pxTorem(24)};
  display: grid;
  gap: ${pxTorem(24)};
  height: fit-content;
  align-content: start;
  overflow-y: auto;
  scroll-behavior: smooth;

  > button {
    justify-self: end;
  }
`;

export const StyledFormField = styled.fieldset`
  border: none;
  display: grid;
  grid-gap: ${pxTorem(8)};
  label {
    font-weight: var(--bold);
    font-size: ${pxTorem(20)};
  }
`;
