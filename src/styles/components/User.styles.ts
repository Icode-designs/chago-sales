"use client";
import pxTorem from "@/utils/pxToRem";
import styled, { css } from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledSideBar = styled.div<{ $navOpen: boolean }>`
  position: fixed;
  background-color: var(--col-000);
  height: ${({ $navOpen }) => ($navOpen ? pxTorem(270) : pxTorem(55))};
  width: ${({ $navOpen }) => ($navOpen ? pxTorem(250) : pxTorem(40))};
  margin-top: ${pxTorem(82)};
  display: grid;
  padding: ${({ $navOpen }) => ($navOpen ? pxTorem(8) : pxTorem(16))};
  right: 0;
  top: 0;
  z-index: 10;
  border-radius: ${pxTorem(24)} 0 0 ${pxTorem(24)};
  transition: all ease 0.5s;

  > button {
    align-self: start;
    justify-self: start;
    ${({ $navOpen }) =>
      $navOpen
        ? undefined
        : css`
            transform: translateX(-10px) translateY(-5px);
          `}

    svg {
      color: var(--col-100);
      font-size: ${pxTorem(32)};
    }
  }

  @media ${QUERY.TABLET} {
    margin-top: ${pxTorem(112)};
  }

  @media ${QUERY.DESKTOP} {
    position: sticky;
    top: 0;
    left: 0;
    width: 30%;
    height: calc(100vh - ${pxTorem(110)});
    overflow-y: auto;
    border-radius: 0;
    margin: 0;

    > button {
      display: none;
    }
  }
`;

export const LinksList = styled.ul<{ $show: boolean }>`
  display: grid;
  align-content: start;
  gap: ${pxTorem(16)};
  text-align: center;
  width: fit-content;
  align-self: start;
  justify-self: center;
  justify-items: center;
  overflow: hidden;
  height: ${({ $show }) => ($show ? pxTorem(200) : 0)};
  overflow: hidden;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: ${({ $show }) => ($show ? "all ease 0.8s" : "all ease 0.3s")};

  > button {
    color: var(--col-300);
    font-size: ${pxTorem(20)};
  }

  li {
    font-weight: 600;
    color: var(--col-100);
    font-size: ${pxTorem(20)};

    a {
      color: var(--col-100);
      transition: color ease 0.3s;
      &.active {
        color: var(--col-200);
      }
    }
  }

  @media ${QUERY.DESKTOP} {
    padding-right: ${pxTorem(70)};
    align-self: center;
    text-align: right;
    justify-self: flex-end;
  }
`;

export const UserContainer = styled.main`
  position: relative;
  display: flex;
  align-items: start;
  gap: 0;
  margin-top: ${pxTorem(82)};
  max-height: 100vh;
  overflow-y: hidden;

  @media ${QUERY.TABLET} {
    margin-top: ${pxTorem(115)};
  }
`;

export const UserContent = styled.div`
  position: relative;
  width: 100%;
  padding: ${pxTorem(40)} ${pxTorem(24)} ${pxTorem(90)};
  display: grid;
  gap: ${pxTorem(40)};
  justify-items: center;
  align-items: top;
  min-height: calc(100vh - ${pxTorem(82)});
  @media ${QUERY.DESKTOP} {
    padding: ${pxTorem(40)};
    min-height: calc(100vh - ${pxTorem(112)});
  }
`;

export const UserContentContainer = styled.section`
  width: 100%;
  max-height: calc(100vh - ${pxTorem(81)});
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 1024px;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }

  @media ${QUERY.DESKTOP} {
    max-height: calc(100vh - ${pxTorem(112)});
  }
`;

export const StyledImagePlaceholder = styled.div`
  height: ${pxTorem(200)};
  width: ${pxTorem(200)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--col-000);
  svg {
    font-size: ${pxTorem(100)};
    color: grey;
  }
`;

export const ImageForm = styled.form`
  background: none;
  padding: 0;
  display: grid;
  justify-items: center;
  label {
    cursor: pointer;
  }
`;

export const StyledSalesContent = styled.ul`
  width: 100%;
  height: fit-content;
  display: grid;
  gap: ${pxTorem(24)};
  align-content: start;
`;

export const StledSalesCard = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: var(--col-100);
  background-color: var(--border-radius);
`;
