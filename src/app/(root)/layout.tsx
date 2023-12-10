"use client";

import { ChildrenProps } from "#/lib/types";
import { useGetUserQuery } from "#/services";

export default function RootLayout({ children }: ChildrenProps) {
  useGetUserQuery({ Authorization: localStorage.getItem("access_token") ?? "" });
  return children;
}
