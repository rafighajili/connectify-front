"use client";

import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import { useAppDispatch } from "#/store";

export default function LandingLayout({ children }: Children) {
  const dispatch = useAppDispatch();

  const items = [
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

  return (
    <>
      <MyNavbar items={items} />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
