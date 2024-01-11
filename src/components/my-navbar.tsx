"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Switch,
} from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { ConnectifyLogo } from "#/components";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import useMounted from "#/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export function MyNavbar({
  logoHref,
  centerElements,
  endElements,
}: {
  logoHref: string;
  centerElements: Record<"title" | "link", string>[];
  endElements: ReactNode[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { resolvedTheme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(resolvedTheme === "dark");

  useEffect(() => {
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isDarkMode]);

  const pathname = usePathname();

  const mounted = useMounted();

  const navbarItemsComponent = (
    <>
      {centerElements.map((navbarItem) => {
        const isActive = pathname === navbarItem.link;
        return (
          <NavbarItem key={navbarItem.title} isActive={isActive}>
            <Link href={navbarItem.link} as={NextLink} color={isActive ? "primary" : "foreground"}>
              {navbarItem.title}
            </Link>
          </NavbarItem>
        );
      })}

      {mounted && (
        <NavbarItem>
          <Switch
            aria-label="Dark mode switch"
            isSelected={isDarkMode}
            onValueChange={setIsDarkMode}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
          />
        </NavbarItem>
      )}
    </>
  );

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden" />
        <NavbarBrand>
          <NextLink href={logoHref}>
            <ConnectifyLogo size={50} className="pointer-events-none" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-6 lg:flex" justify="center">
        {navbarItemsComponent}
      </NavbarContent>

      <NavbarContent justify="end">
        {endElements.map((element, key) => (
          <NavbarItem key={key}>{element}</NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="gap-6 py-6">{navbarItemsComponent}</NavbarMenu>
    </Navbar>
  );
}
