"use client";

import { Button } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";

export default function LandingLayout({ children }: Children) {
  const centerElements = [
    {
      title: "All events",
      link: "/s",
    },
    {
      title: "My sponsored events",
      link: "/s/my-events",
    },
  ];

  const endElements = [<Button variant="light">Log out</Button>];

  return (
    <>
      <MyNavbar logoHref="/s" centerElements={centerElements} endElements={endElements} />
      <div className="py-12">{children}</div>
      <MyFooter />
    </>
  );
}
