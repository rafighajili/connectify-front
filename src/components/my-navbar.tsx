"use client";

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import { ConnectifyLogo } from "#/components";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  const navbarItemsComponent = (
    <>
      {centerElements.map((navbarItem) => {
        const isActive = pathname === navbarItem.link;
        return (
          <NavbarItem key={navbarItem.title} isActive={isActive}>
            <Link
              href={navbarItem.link}
              as={NextLink}
              color={isActive ? "primary" : "foreground"}
              onPress={() => setIsMenuOpen(false)}
            >
              {navbarItem.title}
            </Link>
          </NavbarItem>
        );
      })}
    </>
  );

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
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

      <NavbarMenu className="gap-6 overflow-y-auto py-6">{navbarItemsComponent}</NavbarMenu>
    </Navbar>
  );
}
