"use client";
import pxTorem from "@/utils/pxToRem";
import styled from "styled-components";
import QUERY from "../mediaBreakpoints";

export const HeaderContainer = styled.header<{ $navOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--col-100);
  height: fit-content;
  padding: ${pxTorem(16)} 0;
  z-index: 100;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--max-width);
    margin: var(--centered);
    height: fit-content;
    padding: 0 ${pxTorem(16)};
    gap: ${pxTorem(16)};

    .menu {
      > button {
        background: none;
        height: fit-content;
        border: none;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: ${pxTorem(5)};
        div {
          width: ${pxTorem(25)};
          height: ${pxTorem(3)};
          background-color: var(--col-000);
          transition: all 0.3s ease;

          &:nth-of-type(2) {
            transform: translateX(25%);
            display: ${({ $navOpen }) => ($navOpen ? "none" : "block")};
          }
          &:nth-of-type(1) {
            transform: ${({ $navOpen }) =>
              $navOpen ? "rotate(-45deg) translateY(5px)" : "0"};
          }
          &:nth-of-type(3) {
            transform: ${({ $navOpen }) =>
              $navOpen ? "rotate(45deg)  translateY(-5px)" : "0"};
          }
        }
      }
    }

    nav {
      display: none;
    }
  }

  @media ${QUERY.DESKTOP} {
    > div:nth-of-type(1) {
      padding: 0;
      nav {
        display: flex;
        position: static;
        background: none;
        font-weight: var(--bold);
        padding: 0;
        gap: ${pxTorem(16)};
        align-items: center;
        width: fit-content;
        top: unset;
        left: unset;
        height: fit-content;

        ul:nth-of-type(1) {
          display: flex;
          gap: ${pxTorem(16)};
          width: 100%;
          li {
            width: fit-content;
            width: 100%;

            &.categories {
              position: relative;

              ul {
                display: grid;
                gap: ${pxTorem(8)};
                position: absolute;
                padding: ${pxTorem(16)};
                width: fit-content;
                top: ${pxTorem(70)};
                background-color: var(--col-100);
                left: 0;
                border-radius: 0 0 ${pxTorem(12)} ${pxTorem(12)};
              }
            }
            a {
              width: fit-content;
              display: flex;
              font-size: ${pxTorem(16)};
              font-weight: var(--semibold);
            }
          }
        }
      }
    }

    > button {
      display: none;
    }
  }
`;

export const SearchResultsBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1.5rem);
  background-color: rgba(0, 0, 0, 0.5);

  > div {
    display: grid !important;
    grid-gap: ${pxTorem(4)};
    width: 80%;
    height: fit-content;
    top: ${pxTorem(120)};
    left: 0;
    right: 0;
    padding: ${pxTorem(16)};
    padding-top: ${pxTorem(24)};
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    background-color: var(--col-100);
    max-width: var(--max-width);
    margin: var(--centered);

    a {
      span {
        font-weight: var(--bold);
      }
    }
  }
`;

export const CartContainer = styled.div`
  position: relative;
  width: ${pxTorem(40)};
  height: ${pxTorem(55)};
  display: flex;
  align-items: center;
  .amount {
    color: var(--col-000);
    position: absolute;
    top: 0;
    right: ${pxTorem(8)};
  }
`;
