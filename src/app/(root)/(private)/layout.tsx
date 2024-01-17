"use client";

import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import { Children } from "#/types";
import { MyFooter, MyNavbar } from "#/components";

export default function PrivateLayout({ children }: Children) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const isCorrectSegment = user?.role.toLowerCase() === segment;

  useEffect(() => {
    if (!isLoading && !(user && isCorrectSegment)) {
      router.push("/");
    }
  }, [isLoading, user, isCorrectSegment]);

  if (!(user && isCorrectSegment)) {
    return null;
  }

  const items = {
    ADMIN: [
      {
        key: 1,
        title: "Events",
        link: "/admin",
      },
      {
        key: 2,
        title: "Requests",
        link: "/admin/requests",
      },
      {
        key: 3,
        title: "Sponsors",
        link: "/admin/sponsors",
      },
      {
        key: 4,
        title: "Contacts",
        link: "/admin/contacts",
      },
    ],
    ORGANIZER: [
      {
        key: 1,
        title: "My events",
        link: "/organizer",
      },
      {
        key: 2,
        title: "Create a new event",
        link: "/organizer/create-event",
      },
    ],
    SPONSOR: [
      {
        key: 1,
        title: "All events",
        link: "/sponsor",
      },
      {
        key: 2,
        title: "My sponsored events",
        link: "/sponsor/sponsored-events",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MyNavbar items={items[user.role]} />
      <div className="container flex-1 py-12">{children}</div>
      <MyFooter />
    </div>
  );
}
