"use client";

import { ChildrenProps } from "#/lib/types";
import { Link } from "#/lib";
import { ConnectifyLogo } from "#/components";

export default function AuthLayout({ children }: ChildrenProps) {
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
