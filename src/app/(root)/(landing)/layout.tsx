"use client";

import { Button, Link } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import NextLink from "next/link";

export default function LandingLayout({ children }: Children) {
  const centerElements = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Events",
      link: "/events",
    },
    {
      title: "Sponsors",
      link: "/sponsors",
    },
    {
      title: "Organizers",
      link: "/organizers",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const endElements = [
    <Link as={NextLink} href="/login">
      Login
    </Link>,
    <Button as={NextLink} href="/register" color="primary" radius="full">
      Get started
    </Button>,
  ];

  return (
    <>
      <MyNavbar logoHref="/" centerElements={centerElements} endElements={endElements} />
      <div className="py-12">{children}</div>
      <MyFooter />
    </>
  );
}
