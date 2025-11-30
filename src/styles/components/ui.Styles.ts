"use client";
import pxTorem from "@/utils/pxToRem";
import styled, { css } from "styled-components";
import QUERY from "../mediaBreakpoints";
import Link from "next/link";
import Image from "next/image";

export const MainContainer = styled.main<{ $variant?: "secondary" }>`
  max-width: var(--max-width);
  min-height: 100vh;
  width: 100%;
  margin: var(--centered);
  margin-bottom: ${pxTorem(90)};
  margin-top: ${pxTorem(82)};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${pxTorem(90)};
  @media ${QUERY.DESKTOP} {
    margin-top: ${pxTorem(112)};
    padding: 0;
  }

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      margin: 0;
      background-color: var(--col-100);
      border-radius: var(--border-radius);
      padding: ${pxTorem(16)};
      @media ${QUERY.TABLET} {
        margin: 0;
        padding: ${pxTorem(24)};
      }
      @media ${QUERY.DESKTOP} {
        margin: 0;
        padding: ${pxTorem(40)};
      }
    `}
`;

export const LogoBox = styled.div<{ $variant: "black" | "white" }>`
  width: ${pxTorem(100)};
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: ${pxTorem(50)};
  a {
    width: 100%;
  }

  @media ${QUERY.TABLET} {
    width: ${pxTorem(200)};
    height: ${pxTorem(80)};
  }

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
    display: block;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

export const StyledSearchBar = styled.div`
  width: 100%;
  max-width: ${pxTorem(600)};
`;

export const CustomButton = styled.button<{
  $variant?: "extended" | "outlined";
}>`
  background-color: var(--col-400);
  color: var(--col-100);
  border: none;
  padding: ${pxTorem(16)};
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.5s;
  border-radius: var(--border-radius);
  font-weight: var(--bold);
  text-transform: capitalize;

  ${({ $variant }) =>
    $variant === "extended" &&
    css`
      width: 100%;
    `}

  ${({ $variant }) =>
    $variant === "outlined" &&
    css`
      background-color: none !important;
      border: ${pxTorem(1)} solid var(--col-400);

      &:hover {
        background-color: var(--col-400);
      }
    `}

    &:hover {
    opacity: 0.6;
  }
`;

export const CustomLink = styled(Link)<{
  $variant?: "extended" | "outlined";
}>`
  background-color: var(--col-400);
  color: var(--col-100);
  border: none;
  padding: ${pxTorem(16)};
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.5s;
  border-radius: var(--border-radius);
  font-weight: var(--bold);
  text-transform: capitalize;

  ${({ $variant }) =>
    $variant === "extended" &&
    css`
      width: 100%;
    `}

  ${({ $variant }) =>
    $variant === "outlined" &&
    css`
      background-color: none;
      border: ${pxTorem(1)} solid var(--col-400);

      &:hover {
        background-color: var(--col-400);
      }
    `}

    &:hover {
    opacity: 0.6;
  }
`;

export const FlexBox = styled.div<{
  $justifyContent?: string;
  $alignItems?: string;
  $gap?: number;
  $variant?: "secondary";
  $width?: string;
}>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-start"};
  align-items: ${({ $alignItems }) => $alignItems || "center"};
  gap: ${({ $gap }) => (typeof $gap === "number" ? pxTorem($gap) : pxTorem(0))};
  width: ${({ $width }) => $width || "unset"};
  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      flex-direction: column;
      @media ${QUERY.TABLET} {
        flex-direction: row;
      }
    `};
`;

export const ProductSection = styled.section<{ $variant?: string }>`
  margin: 0 ${pxTorem(16)};
  > div {
    padding: ${pxTorem(16)};
    &:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--col-100);
      border-top-right-radius: var(--border-radius);
      border-top-left-radius: var(--border-radius);

      ${({ $variant }) =>
        $variant === "categories"
          ? css`
              background-color: var(--col-400);
            `
          : $variant === "flash-sale"
          ? css`
              background-color: var(--col-300);
            `
          : css`
              background-color: var(--col-200);
            `}
    }
  }

  @media ${QUERY.DESKTOP} {
    margin: 0;
  }
`;

export const ProductCard = styled.div<{ $variant?: string }>`
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: 1fr;
  transition: all ease 0.5s;
  cursor: pointer;
  padding: ${pxTorem(16)} 0;
  grid-gap: ${pxTorem(8)};
  height: 100%;
  position: relative;
  padding: ${pxTorem(8)};

  button {
    align-self: end;
  }

  a {
    width: 100%;
  }

  .favourite {
    position: absolute;
    top: ${pxTorem(8)};
    right: ${pxTorem(8)};
    border-radius: 50%;
    padding: ${pxTorem(8)};
    display: flex;
    height: fit-content;
    width: fit-content;

    svg {
      font-size: ${pxTorem(28)};
    }

    &:hover {
      background-color: rgba(253, 0, 0, 0.3);
    }
  }

  img {
    width: 100%;
    height: ${pxTorem(205)};
    object-fit: contain;
    object-position: center;
  }

  article {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: auto;
    padding: 0 ${pxTorem(8)};

    ${({ $variant }) =>
      $variant === "categories" &&
      css`
        h3 {
          text-align: center;
        }
      `}
  }

  &:hover {
    box-shadow: var(--shadow);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${pxTorem(140)}, 1fr));
  grid-gap: ${pxTorem(32)};
  background-color: var(--col-100);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  width: 100%;
  padding: ${pxTorem(16)};
  @media ${QUERY.TABLET} {
    grid-template-columns: repeat(auto-fill, minmax(${pxTorem(200)}, 1fr));
  }
`;

export const AuthMain = styled.main`
  display: grid;
  justify-items: center;
  align-content: center;
  padding: ${pxTorem(16)};
  min-height: 100vh;
  @keyframes entry {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  form {
    max-width: ${pxTorem(700)};
  }

  animation: entry ease-in-out 0.5s;

  @media ${QUERY.TABLET} {
    padding: ${pxTorem(24)};

    form {
      .seperator {
        p {
          flex: 1;
        }
        div {
          flex: 1.5;
        }
      }
    }
  }
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxTorem(16)};
`;

export const FormImages = styled(Image)`
  max-width: 100%;
  height: ${pxTorem(150)};
  object-fit: contain;
  border-radius: ${pxTorem(8)};
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${pxTorem(150)}, 1fr));
  gap: ${pxTorem(16)};
  > div {
    position: relative;

    .delete {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;
