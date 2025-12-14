"use client";
import { RootState } from "@/store/store";
import { OrderHeader, UserContent } from "@/styles/components/User.styles";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const requests = useSelector(
    (state: RootState) => state.requests.requestList
  );
  return (
    <UserContent>
      <OrderHeader>
        <h2>Manage Requests</h2>
      </OrderHeader>
      {requests.length <= 0 && <p>No request found</p>}
    </UserContent>
  );
};

export default Page;
