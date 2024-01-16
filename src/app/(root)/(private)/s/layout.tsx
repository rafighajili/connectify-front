"use client";

import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";
import { useAppDispatch } from "#/store";

export default function LandingLayout({ children }: Children) {
  const dispatch = useAppDispatch();

  const items = [
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

  return (
    <>
      <MyNavbar items={items} />
      <div className="container py-12">{children}</div>
      <MyFooter />
    </>
  );
}
