"use client";

import { Button } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import { useAppDispatch } from "#/store";
import { resetAuth } from "#/store/slices";

export default function LandingLayout({ children }: Children) {
  const dispatch = useAppDispatch();

  const centerElements = [
    {
      key: 1,
      title: "My events",
      link: "/o",
    },
    {
      key: 2,
      title: "Create a new event",
      link: "/o/create-event",
    },
  ];

  const endElements = [
    <Button key={1} variant="light" onPress={() => dispatch(resetAuth())}>
      Log out
    </Button>,
  ];

  return (
    <>
      <MyNavbar logoHref="/o" centerElements={centerElements} endElements={endElements} />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
