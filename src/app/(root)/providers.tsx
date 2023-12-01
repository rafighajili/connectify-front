"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ChildrenProps } from "#/lib/types";
import { store } from "#/store";

export function Providers({ children }: ChildrenProps) {
  return (
    <AfterMountingProviders>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AfterMountingProviders>
  );
}

function AfterMountingProviders({ children }: ChildrenProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <ThemeProvider attribute="class">{children}</ThemeProvider> : children;
}
