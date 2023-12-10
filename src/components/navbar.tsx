import { Button, Link, Spinner } from "#/lib";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ConnectifyLogo } from "#/components";
import { useMounted } from "#/utils";
import NextLink from "next/link";

export function Navbar() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <nav className="sticky inset-x-0 top-0 z-50 border-b border-b-default-1000/20 bg-default-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/">
          <ConnectifyLogo className="h-12 w-auto" />
        </Link>

        <div className="flex gap-4">
          <Button variant="light" radius="full" isIconOnly onPress={() => setTheme(isDarkTheme ? "light" : "dark")}>
            {mounted ? isDarkTheme ? <MoonIcon /> : <SunIcon /> : <Spinner />}
          </Button>

          <Button elementType={NextLink} href="/login" variant="light" radius="full">
            Login
          </Button>

          <Button elementType={NextLink} href="/login" color="primary" radius="full">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
