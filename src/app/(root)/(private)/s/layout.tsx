"use client";

import { Button } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";

export default function LandingLayout({ children }: Children) {
  const centerElements = [
    {
      key: 1,
      title: "All events",
      link: "/s",
    },
    {
      key: 2,
      title: "My sponsored events",
      link: "/s/my-events",
    },
  ];

  const endElements = [
    <Button key={1} variant="light">
      Log out
    </Button>,
  ];

  return (
    <>
      <MyNavbar logoHref="/s" centerElements={centerElements} endElements={endElements} />
      <div className="py-12">{children}</div>
      <MyFooter />
    </>
  );
}
