"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { MainSection, PartnersSection } from "../_components";
import { useCreateContactSponsorMutation } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { contactSponsorRequestSchema, ContactSponsorRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function SponsorsPage() {
  const [createContactSponsor, { isLoading, isSuccess }] = useCreateContactSponsorMutation();

  const { control, handleSubmit, reset } = useForm<ContactSponsorRequestType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
    },
    resolver: zodResolver(contactSponsorRequestSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <>
      <MainSection>
        <Card classNames={{ base: "py-3 px-6", header: "flex-col items-start gap-3 text-start" }}>
          <CardHeader>
            <h3 className="text-2xl font-medium">Sponsor Contact details</h3>
            <p className="text-sm text-default-500">Please fill your information so we can get in touch with you.</p>
            {isSuccess && (
              <p className="text-success-500">Your request has been sent successfully, we will get back to you soon!</p>
            )}
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(createContactSponsor)} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Controller
                control={control}
                name="firstName"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="bordered"
                    label="Your first name"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="bordered"
                    label="Your last name"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="bordered"
                    label="Your email"
                    className="sm:col-span-2"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="bordered"
                    label="Your phone number"
                    className="sm:col-span-2"
                    startContent={<span className="text-sm text-default-500">+944</span>}
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="companyName"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="bordered"
                    label="Company name"
                    className="sm:col-span-2"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />

              <Button color="primary" size="lg" className="sm:col-span-2" type="submit" isLoading={isLoading}>
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
