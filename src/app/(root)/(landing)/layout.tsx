"use client";

import { MyFooter, MyNavbar } from "#/components";
import { Children } from "#/types";

export default function LandingLayout({ children }: Children) {
  const items = [
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

  return (
    <>
      <MyNavbar items={items} />
      <div className="py-12">{children}</div>
      <MyFooter />
    </>
  );
}
