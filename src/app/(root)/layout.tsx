"use client";

import { Providers } from "./providers";
import { Footer, Navbar } from "#/components";
import { ChildrenProps } from "#/lib/types";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <Providers>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </Providers>
  );
}
