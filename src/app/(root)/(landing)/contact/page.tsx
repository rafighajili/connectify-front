"use client";

import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import { MainSection, PartnersSection } from "../_components";
import { useCreateContactMutation } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { contactRequestSchema, ContactRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function ContactPage() {
  const [createContact, { isLoading, isSuccess, isError }] = useCreateContactMutation();

  const { control, handleSubmit, reset } = useForm<ContactRequestType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    resolver: zodResolver(contactRequestSchema),
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
            <h3 className="text-2xl font-medium">Contact us</h3>
            <p className="text-sm text-default-500">Our friendly team would love to hear from you.</p>

            {isSuccess && (
              <p className="text-success-500">We received your message successfully, thank you for contacting us!</p>
            )}
            {isError && <p className="text-danger-500">Occurred some error.</p>}
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(createContact)} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Controller
                control={control}
                name="firstName"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    variant="faded"
                    label="First name"
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
                    variant="faded"
                    label="Last name"
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
                    variant="faded"
                    className="sm:col-span-2"
                    label="Email address"
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
                    variant="faded"
                    className="sm:col-span-2"
                    label="Phone number"
                    startContent={<span className="text-sm text-default-500">+944</span>}
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="message"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Textarea
                    variant="faded"
                    className="sm:col-span-2"
                    label="Your message"
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
