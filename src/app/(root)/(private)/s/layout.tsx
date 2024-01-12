"use client";

import { Button } from "@nextui-org/react";
import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import { resetAuth } from "#/store/slices";
import { useAppDispatch } from "#/store";

export default function LandingLayout({ children }: Children) {
  const dispatch = useAppDispatch();

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
    <Button key={1} variant="light" onPress={() => dispatch(resetAuth())}>
      Log out
    </Button>,
  ];

  return (
    <>
      <MyNavbar logoHref="/s" centerElements={centerElements} endElements={endElements} />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
