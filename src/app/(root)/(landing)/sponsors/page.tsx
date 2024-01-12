"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { MainSection, PartnersSection } from "../_components";

export default function SponsorsPage() {
  return (
    <>
      <MainSection>
        <Card classNames={{ base: "py-3 px-6", header: "flex-col items-start gap-3 text-start" }}>
          <CardHeader>
            <h3 className="text-2xl font-medium">Sponsor Contact details</h3>
            <p className="text-default-500 text-sm">Please fill your information so we can get in touch with you.</p>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-3">
              <Input variant="faded" label="Your name" />
              <Input variant="faded" label="Your email" />
              <Input variant="faded" label="Your phone number" />
              <Input variant="faded" label="Company name" />
              <Button color="primary" size="lg">
                Send
              </Button>
            </form>
          </CardBody>
        </Card>
      </MainSection>

      <PartnersSection />
    </>
  );
}
