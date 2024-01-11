"use client";

import { Button } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";

export default function LandingLayout({ children }: Children) {
  const centerElements = [
    {
      title: "My events",
      link: "/o",
    },
    {
      title: "Create a new event",
      link: "/o/create-event",
    },
  ];

  const endElements = [<Button variant="light">Log out</Button>];

  return (
    <>
      <MyNavbar logoHref="/o" centerElements={centerElements} endElements={endElements} />
      <div className="py-12">{children}</div>
      <MyFooter />
    </>
  );
}
