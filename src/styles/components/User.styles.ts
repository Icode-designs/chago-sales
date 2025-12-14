"use client";
import pxTorem from "@/utils/pxToRem";
import styled, { css } from "styled-components";
import QUERY from "../mediaBreakpoints";

export const StyledSideBar = styled.div<{ $navOpen: boolean }>`
  position: fixed;
  background-color: var(--col-000);
  height: ${({ $navOpen }) => ($navOpen ? pxTorem(320) : pxTorem(55))};
  width: ${({ $navOpen }) => ($navOpen ? pxTorem(250) : pxTorem(40))};
  margin-top: ${pxTorem(24)};
  display: grid;
  padding: ${({ $navOpen }) => ($navOpen ? pxTorem(8) : pxTorem(16))};
  right: 0;
  top: 0;
  z-index: 10;
  border-radius: ${pxTorem(24)} 0 0 ${pxTorem(24)};
  transition: all ease 0.5s;

  > button:nth-of-type(1) {
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

  > button:nth-of-type(2) {
    color: var(--col-300);
    font-size: ${pxTorem(15)};
    padding: ${pxTorem(12)};
    transform: translateX(${({ $navOpen }) => ($navOpen ? 0 : pxTorem(500))});
    transition: transform ease 0.8s 0.3s;

    p {
      font-size: ${pxTorem(12)};
      font-weight: 600;
    }
  }

  > div {
    display: none;
  }

  @media ${QUERY.DESKTOP} {
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: start;
    top: 0;
    left: 0;
    width: ${pxTorem(350)};
    height: 100vh;
    overflow-y: auto;
    border-radius: 0;
    margin: 0;
    > div {
      display: block;
      padding: ${pxTorem(15)};
      border-bottom: solid ${pxTorem(1)} grey;
      height: fit-content;
      h3 {
        font-size: ${pxTorem(13)};
        color: var(--col-100);
      }
    }

    > button:nth-of-type(1) {
      display: none;
    }
    > button:nth-of-type(2) {
      color: var(--col-300);
      font-size: ${pxTorem(15)};
      padding: ${pxTorem(12)};
      justify-self: end;

      p {
        font-size: ${pxTorem(12)};
        font-weight: 600;
      }
    }
  }
`;

export const UserOrderList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxTorem(16)};
  width: 100%;
`;

export const NavigationBox = styled.nav<{ $show: boolean }>`
  display: block;
  align-content: start;
  gap: ${pxTorem(16)};
  width: 100%;
  align-self: start;
  justify-self: center;
  justify-items: center;
  overflow: hidden;
  height: ${({ $show }) => ($show ? pxTorem(215) : 0)};
  overflow: hidden;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: ${({ $show }) => ($show ? "all ease 0.8s" : "all ease 0.3s")};

  a {
    display: inline-block;
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: ${pxTorem(1)};
    color: var(--col-100);
    font-size: ${pxTorem(13)};
    width: 100%;
    height: fit-content;
    padding: ${pxTorem(15)};
    transition: all ease 0.5s;
    margin-bottom: ${pxTorem(4)};

    &:hover {
      border-radius: var(--border-radius);
      background-color: #f2e4ff18;
    }
    svg {
      font-size: ${pxTorem(16)};
    }
    &.active {
      border-radius: var(--border-radius);
      background-color: var(--col-200-light);
      color: var(--col-200);
      width: 100%;
    }
  }

  @media ${QUERY.DESKTOP} {
    align-self: start;
    height: 100%;
    padding-top: ${pxTorem(15)};
  }
`;

export const UserContainer = styled.main`
  position: relative;
  display: flex;
  gap: 0;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
`;

export const UserContent = styled.div`
  position: relative;
  width: 100%;
  padding: ${pxTorem(40)} ${pxTorem(24)};
  display: grid;
  gap: ${pxTorem(40)};
  justify-items: center;

  @media ${QUERY.DESKTOP} {
    padding: ${pxTorem(40)};
  }
`;

export const UserContentContainer = styled.section`
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  align-content: start;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
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

export const StyledOrderCard = styled.li`
  display: grid;
  grid-template-areas: "id title title" "price qty status";
  background-color: var(--col-100);
  border-radius: var(--border-radius);
  padding: ${pxTorem(18)};
  width: 100%;
  gap: ${pxTorem(24)};

  h3 {
    grid-area: id;
    justify-self: start;
    align-self: start;
  }

  p {
    &:nth-of-type(1) {
      grid-area: title;
      justify-self: end;
      align-self: start;
    }
    &:nth-of-type(2) {
      grid-area: price;
      justify-self: start;
      align-self: end;
    }
    &:nth-of-type(3) {
      grid-area: qty;
      justify-self: center;
      align-self: end;
    }
  }

  .status {
    grid-area: status;
    justify-self: end;
    align-self: end;
    padding: ${pxTorem(10)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    text-transform: capitalize;
  }

  @media ${QUERY.TABLET} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .status,
    h3 {
      justify-self: unset;
      align-self: unset;
    }

    p {
      &:nth-of-type(1) {
        justify-self: unset;
        align-self: unset;
      }
      &:nth-of-type(2) {
        justify-self: unset;
        align-self: unset;
      }
      &:nth-of-type(3) {
        justify-self: unset;
        align-self: unset;
      }
    }
  }
`;

export const OrderHeader = styled.header`
  width: 100%;
  padding: 0 ${pxTorem(24)};
  > div {
    text-align: left;
  }
`;

export const ItemInfoBox = styled.div`
  padding: ${pxTorem(16)};
  border-radius: var(--border-radius);
  background-color: var(--col-100);
  width: 100%;

  .suspend {
    background-color: #ff4c4cff;
    color: var(--col-300);
  }

  > div {
    padding: ${pxTorem(15)} 0;
    border-bottom: solid grey ${pxTorem(1)};
    margin-bottom: ${pxTorem(15)};
    h3 {
      overflow-wrap: break-word;
      word-break: break-word;
      white-space: normal;
    }

    p {
      font-weight: 600;
      color: gray;
    }
  }

  ul {
    > * {
      margin-bottom: ${pxTorem(24)};
    }
    @media ${QUERY.TABLET} {
      padding: ${pxTorem(15)};
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(${pxTorem(340)}, 1fr));
      row-gap: ${pxTorem(24)};
      column-gap: ${pxTorem(20)};

      > * {
        margin-bottom: 0;
      }

      li {
        p {
          color: gray;
        }

        .item-label-icon {
          font-size: ${pxTorem(24)};
        }
      }
    }
  }

  @media ${QUERY.DESKTOP} {
    grid-template-columns: repeat(3, 1fr) !important;
  }
`;

export const VendorSuggestionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${pxTorem(24)};
  width: 100%;
  text-align: left;
  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: ${pxTorem(16)};

    li {
      padding: ${pxTorem(24)} ${pxTorem(16)};
      border-radius: var(--border-radius);
      display: grid;
      justify-content: space-between;
      column-gap: ${pxTorem(20)};
      row-gap: ${pxTorem(24)};
      background-color: var(--col-100);
      grid-template-areas: "vendor stock" "button button";
      p {
        color: grey;
      }
      div {
        &:nth-of-type(1) {
          grid-area: vendor;
          justify-self: left;
        }
        &:nth-of-type(2) {
          grid-area: stock;
          justify-self: right;
        }
      }

      button {
        grid-area: button;
        gap: ${pxTorem(10)};
        width: 100%;
        p {
          color: var(--col-100);
          font-weight: 600;
        }
      }

      @media ${QUERY.TABLET} {
        display: flex;
        div {
          &:nth-of-type(1) {
            justify-self: unset;
          }
          &:nth-of-type(2) {
            justify-self: unset;
          }
        }

        button {
          width: fit-content;
        }
      }
    }
  }
`;

export const UserlistHeader = styled.header<{
  $displayingVendors: boolean;
  $displayingCustomers: boolean;
}>`
  width: 100%;
  display: grid;
  padding: ${pxTorem(16)} 0;

  border-bottom: solid ${pxTorem(1)} grey;
  gap: ${pxTorem(24)};

  > div {
    display: flex;
    gap: ${pxTorem(24)};
    justify-content: space-between;

    button {
      cursor: pointer;
      &:nth-last-of-type(2) {
        color: ${({ $displayingVendors }) =>
          $displayingVendors && "var(--col-200)"};
      }
      &:nth-last-of-type(1) {
        color: ${({ $displayingCustomers }) =>
          $displayingCustomers && "var(--col-200)"};
      }
    }
  }

  input {
    max-width: ${pxTorem(600)};
    background: none;
  }
`;

export const UserDisplayCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxTorem(280)}, 1fr));
  width: 100%;
  background-color: var(--col-100);
  border-radius: var(--border-radius);
  padding: ${pxTorem(16)};
  row-gap: ${pxTorem(24)};
  column-gap: auto;

  @media (min-width: ${pxTorem(900)}) {
    display: flex;
    justify-content: space-between;
    gap: ${pxTorem(24)};
  }
`;

export const OrdersChartBox = styled.div`
  width: 100%;
  display: grid;
  gap: ${pxTorem(24)};
  height: fit-content;
  padding: ${pxTorem(24)};
  background-color: var(--col-100);
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
`;
export const StyledOrdersChart = styled.div`
  width: 100%;
  height: ${pxTorem(350)};
`;

export const ChartControlBox = styled.div`
  width: ${pxTorem(200)};
  display: flex;
  gap: ${pxTorem(16)};
  justify-self: end;
`;

export const ChartTitle = styled.h3`
  font-size: ${pxTorem(18)};
  font-weight: 600;
  color: var(--col-000);
  margin: 0 0 ${pxTorem(16)} 0;
  text-align: center;
`;
