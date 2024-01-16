"use client";

import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { RegisterRequest, registerRequestSchema } from "#/schemas";
import { useRegisterOrganizerMutation } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const [registerOrganizer, { isLoading }] = useRegisterOrganizerMutation();

  const { control, handleSubmit } = useForm<RegisterRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: zodResolver(registerRequestSchema),
  });

  return (
    <form onSubmit={handleSubmit(registerOrganizer)} className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your name" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your surname" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your email" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Your phone number"
            startContent={<span className="text-sm text-default-500">+944</span>}
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your password" type="password" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />

      <Button color="primary" type="submit" isLoading={isLoading}>
        Register
      </Button>
      <Button as={NextLink} href="/login" type="button" variant="light" color="primary">
        Login to your account
      </Button>
    </form>
  );
}
