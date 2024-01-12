"use client";

import { Button } from "@nextui-org/react";
import { MainSection, PartnersSection } from "../_components";
import NextLink from "next/link";

export default function OrganizersPage() {
  return (
    <>
      <MainSection>
        <div className="space-y-12">
          <h1 className="text-4xl font-medium">Create an account and find sponsors easily now!</h1>
          <Button as={NextLink} href="/register" radius="full" color="primary" variant="ghost">
            Create your first organizer account
          </Button>
        </div>
      </MainSection>

      <PartnersSection />
    </>
  );
}
