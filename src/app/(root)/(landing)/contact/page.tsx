"use client";

import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import { MainSection, PartnersSection } from "../_components";

export default function ContactPage() {
  return (
    <>
      <MainSection>
        <Card classNames={{ base: "py-3 px-6", header: "flex-col items-start gap-3 text-start" }}>
          <CardHeader>
            <h3 className="text-2xl font-medium">Contact us</h3>
            <p className="text-default-500 text-sm">Our friendly team would love to hear from you.</p>
          </CardHeader>
          <CardBody>
            <form className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input variant="bordered" label="First name" />
              <Input variant="bordered" label="Last name" />
              <Input variant="bordered" className="sm:col-span-2" label="Phone number" />
              <Input variant="bordered" className="sm:col-span-2" label="Email address" />
              <Textarea variant="bordered" className="sm:col-span-2" label="Your message" />
              <Button color="primary" size="lg" className="sm:col-span-2">
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
