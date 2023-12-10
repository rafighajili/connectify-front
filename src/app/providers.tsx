"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { ChildrenProps } from "#/lib/types";
import { store } from "#/store";

export function Providers({ children }: ChildrenProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ReduxProvider>
  );
}
