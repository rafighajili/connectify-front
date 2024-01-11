"use client";

import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Children } from "#/types";

export default function PrivateLayout({ children }: Children) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return null;
  }

  return children;
}
