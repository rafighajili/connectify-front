"use client";

import { useLoginMutation } from "#/services";
import { loginRequestSchema, LoginRequestType } from "#/schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginRequestType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRequestSchema),
  });

  return (
    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your email" {...field} isInvalid={invalid} errorMessage={error?.message} />
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
        Login
      </Button>
      <Button as={NextLink} href="/register" type="button" variant="light" color="primary">
        Create a new account
      </Button>
    </form>
  );
}
