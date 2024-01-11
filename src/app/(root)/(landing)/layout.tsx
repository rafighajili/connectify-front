"use client";

import {
  Button,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Switch,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ConnectifyLogo } from "#/components";
import { useTheme } from "next-themes";
import { Children } from "#/types";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import useMounted from "#/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const navbarItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Events",
    link: "/events",
  },
  {
    title: "Sponsors",
    link: "/sponsors",
  },
  {
    title: "Organizers",
    link: "/organizers",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const footerItems = [
  {
    heading: "Company",
    links: ["About", "Pricing", "Jobs", "Blog", "Careers"],
  },
  {
    heading: "Product",
    links: ["Sales Software", "Features", "Privacy and Security", "Marketplace", "API"],
  },
  {
    heading: "Help Center",
    links: ["Community", "Knowledge Base", "Academy", "Support"],
  },
  {
    heading: "Contact",
    links: ["Instagram", "Linkedin", "Facebook"],
  },
];

export default function LandingLayout({ children }: Children) {
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
      {navbarItems.map((navbarItem) => {
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
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden" />
          <NavbarBrand>
            <NextLink href="/">
              <ConnectifyLogo size={50} />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 lg:flex" justify="center">
          {navbarItemsComponent}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Link as={NextLink} href="/login">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={NextLink} href="/register" color="primary" variant="solid" radius="full">
              Get started
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="gap-4">{navbarItemsComponent}</NavbarMenu>
      </Navbar>

      <div className="py-12">{children}</div>

      <footer className="container space-y-6 py-12">
        <Divider />

        <div className="text-default-500 flex flex-wrap justify-between gap-x-32 gap-y-4 [&_*]:text-sm">
          <p>Copyright @2024 Connectify. All Rights Reserved.</p>
          <p>
            <Link href="#">Terms & Conditions</Link> and <Link href="#">Privacy Policy</Link>.
          </p>
        </div>
      </footer>
    </>
  );
}
