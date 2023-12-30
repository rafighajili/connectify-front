import { Button, DialogTrigger, Link, PopoverDialog } from "#/lib";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ConnectifyLogo } from "#/components";
import { useMounted } from "#/utils";
import { ChildrenProps } from "#/lib/types";
import { useWindowSize } from "usehooks-ts";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar({ children }: ChildrenProps) {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const { width } = useWindowSize();

  return (
    <nav className="sticky inset-x-0 top-0 z-50 border-b border-b-default-1000/20 bg-default-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/">
          <ConnectifyLogo className="h-12 w-auto" />
        </Link>

        {mounted && (
          <div className="flex items-center gap-x-4">
            <Button variant="light" radius="full" isIconOnly onPress={() => setTheme(isDarkTheme ? "light" : "dark")}>
              {isDarkTheme ? <MoonIcon /> : <SunIcon />}
            </Button>

            {width > 640 && children}

            {width <= 640 && (
              <DialogTrigger>
                <Button variant="light" radius="full" isIconOnly>
                  <Bars3Icon />
                </Button>
                <PopoverDialog placement="bottom end" offset={8}>
                  <div className="flex flex-col items-center gap-y-4">{children}</div>
                </PopoverDialog>
              </DialogTrigger>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
