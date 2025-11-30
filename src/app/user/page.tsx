"use client";

import { redirect } from "next/navigation";

export default function page() {
  redirect("/user/edit-profile");
  return;
}
