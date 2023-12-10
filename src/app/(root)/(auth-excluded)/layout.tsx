"use client";

import { Footer, Navbar } from "#/components";
import { ChildrenProps } from "#/lib/types";

export default function AuthExcludedLayout({ children }: ChildrenProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1">{children}</div>
      <Footer />
    </div>
  );
}
