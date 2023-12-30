"use client";

import { ChildrenProps } from "#/lib/types";
import { Footer, Navbar } from "#/components";
import { useAppDispatch, useAppSelector } from "#/store";
import { resetAuth, selectAuth } from "#/store/slices";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "#/lib";
import NextLink from "next/link";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function PrivateLayout({ children }: ChildrenProps) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <>
      <Navbar>
        <Button variant={pathname === "/o" ? "soft" : "light"} color="primary" elementType={NextLink} href="/o">
          My Events
        </Button>

        <Button
          variant={pathname === "/o/contact" ? "soft" : "light"}
          color="primary"
          elementType={NextLink}
          href="/o/contact"
        >
          Contact
        </Button>

        <Button
          variant="light"
          radius="full"
          startContent={<ArrowLeftOnRectangleIcon />}
          onPress={() => {
            localStorage.removeItem("token");
            dispatch(resetAuth());
          }}
        >
          Logout
        </Button>
      </Navbar>
      <div className="container py-16">{children}</div>
      <Footer />
    </>
  );
}
