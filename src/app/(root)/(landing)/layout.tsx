"use client";

import { Footer, Navbar } from "#/components";
import { ChildrenProps } from "#/lib/types";
import { Button } from "#/lib";
import NextLink from "next/link";

export default function LandingLayout({ children }: ChildrenProps) {
  return (
    <>
      <Navbar>
        <Button elementType={NextLink} href="/login" variant="light" radius="full">
          Login
        </Button>

        <Button elementType={NextLink} href="/register" color="primary" radius="full">
          Get started
        </Button>
      </Navbar>

      <div className="container">{children}</div>

      <Footer />
    </>
  );
}
