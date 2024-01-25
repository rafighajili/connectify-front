"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ConnectifyLogo } from "#/components";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLogoutMutation } from "#/services";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { ArrowTopRightOnSquareIcon, UserIcon } from "@heroicons/react/24/outline";

export function MyNavbar({ items }: { items: Record<"title" | "link", string>[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const itemsComponent = (
    <>
      {items.map(({ title, link }) => {
        const isActive = pathname === link;
        return (
          <NavbarItem key={title} isActive={isActive}>
            <Link href={link} as={NextLink} color={isActive ? "primary" : "foreground"}>
              {title}
            </Link>
          </NavbarItem>
        );
      })}
    </>
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const { isLoading, user } = useAppSelector(selectAuth);
  const [logout] = useLogoutMutation();

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="lg:hidden" />
        <NavbarBrand>
          <NextLink href="/">
            <ConnectifyLogo size={50} className="pointer-events-none" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-6 lg:flex" justify="center">
        {itemsComponent}
      </NavbarContent>

      <NavbarContent justify="end">
        {!isLoading &&
          (!user ? (
            <>
              <NavbarItem>
                <Link as={NextLink} href="/login">
                  Log in
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={NextLink} href="/register" color="primary" radius="full">
                  Get started
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Dropdown showArrow placement="bottom-end" crossOffset={-4} className="min-w-[240px]">
                  <DropdownTrigger>
                    <User
                      as="button"
                      classNames={{ base: "flex-row-reverse transition-transform", wrapper: "items-end" }}
                      name={`${user.firstName} ${user.lastName}`}
                      description={user.role}
                      avatarProps={{
                        name: `${user.firstName.charAt(0) + user.lastName.charAt(0)}`.toUpperCase(),
                        classNames: { name: "text-sm" },
                      }}
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Account menu"
                    variant="shadow"
                    topContent={<p className="p-2 text-default-500">{user.email}</p>}
                  >
                    <DropdownItem
                      key="dashboard"
                      as={NextLink}
                      href={`/${user.role.toLowerCase()}`}
                      endContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                    >
                      Go to dashboard
                    </DropdownItem>
                    <DropdownItem
                      key="profile"
                      as={NextLink}
                      href="/profile"
                      endContent={<UserIcon className="h-4 w-4" />}
                    >
                      Edit your account
                    </DropdownItem>
                    <DropdownItem key="logout" onPress={() => logout()}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          ))}
      </NavbarContent>

      <NavbarMenu className="items-start gap-6 overflow-y-auto py-6">{itemsComponent}</NavbarMenu>
    </Navbar>
  );
}
