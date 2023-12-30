"use client";

import { ChildrenProps } from "#/lib/types";
import { Link } from "#/lib";
import { ConnectifyLogo } from "#/components";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: ChildrenProps) {
  const { isLoading, user } = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !!user) {
      router.push(`/${user.role.charAt(0).toLowerCase()}`);
    }
  }, [isLoading, user]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-default-50">
      <div className="container flex min-h-screen flex-col items-center gap-y-16 py-32">
        <Link href="/">
          <ConnectifyLogo className="h-32 w-auto" />
        </Link>

        <main className="w-full max-w-md [&>form]:w-full">{children}</main>
      </div>
    </div>
  );
}
