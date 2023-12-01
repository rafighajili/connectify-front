import { Button, DialogTrigger, Link } from "#/lib";
import { useAppSelector } from "#/store";
import { selectCurrentUser } from "#/store/slices";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { AuthModal } from "#/components/auth-modal";
import { ConnectifyLogo } from "#/components";

export function Navbar() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  return (
    <nav className="sticky inset-x-0 top-0 z-50 border-b border-b-default-1000/20 bg-default-100">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <ConnectifyLogo className="h-12 w-auto" />
        </Link>

        {!currentUser ? (
          <div className="flex gap-4">
            <Button
              variant="light"
              radius="full"
              size="sm"
              isIconOnly
              onPress={() => setTheme(isDarkTheme ? "light" : "dark")}
            >
              {isDarkTheme ? <MoonIcon /> : <SunIcon />}
            </Button>

            <DialogTrigger>
              <Button variant="light" radius="full" size="sm">
                Login
              </Button>
              {(close) => <AuthModal close={close} mode="login" />}
            </DialogTrigger>

            <DialogTrigger>
              <Button color="primary" radius="full" size="sm">
                Get started
              </Button>
              {(close) => <AuthModal close={close} mode="register" />}
            </DialogTrigger>
          </div>
        ) : (
          <Link href="#">{currentUser.username}</Link>
        )}
      </div>
    </nav>
  );
}
