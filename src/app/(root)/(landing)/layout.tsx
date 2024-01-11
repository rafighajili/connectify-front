"use client";

import { Button, Link } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import NextLink from "next/link";

export default function LandingLayout({ children }: Children) {
  const centerElements = [
    {
      key: 1,
      title: "Home",
      link: "/",
    },
    {
      key: 2,
      title: "Events",
      link: "/events",
    },
    {
      key: 3,
      title: "Sponsors",
      link: "/sponsors",
    },
    {
      key: 4,
      title: "Organizers",
      link: "/organizers",
    },
    {
      key: 5,
      title: "Contact",
      link: "/contact",
    },
  ];

  const endElements = [
    <Link key={1} as={NextLink} href="/login">
      Login
    </Link>,
    <Button key={2} as={NextLink} href="/register" color="primary" radius="full">
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
