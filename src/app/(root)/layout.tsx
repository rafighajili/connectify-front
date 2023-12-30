"use client";

import { ChildrenProps } from "#/lib/types";
import { store } from "#/store";
import { authService } from "#/services";

export default function RootLayout({ children }: ChildrenProps) {
  store.dispatch(authService.endpoints.getUser.initiate());
  return children;
}
