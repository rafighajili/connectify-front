"use client";

import { useState } from "react";
import { useLoginOrganizerMutation, useLoginSponsorMutation } from "#/services";
import { LoginRequest, loginRequestSchema } from "#/schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Tab, Tabs } from "@nextui-org/react";
import NextLink from "next/link";

const roles = [
  {
    key: "o",
    name: "Organizer",
  },
  {
    key: "s",
    name: "Sponsor",
  },
];

export default function LoginPage() {
  const [currentRole, setCurrentRole] = useState<string | number>(roles[0].key);
  const [loginOrganizer, { isLoading: isOrganizerLoading }] = useLoginOrganizerMutation();
  const [loginSponsor, { isLoading: isSponsorLoading }] = useLoginSponsorMutation();

  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRequestSchema),
  });

  const onLogin = async (values: LoginRequest) => {
    if (currentRole === "o") {
      await loginOrganizer(values);
    } else {
      await loginSponsor(values);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs selectedKey={currentRole} onSelectionChange={setCurrentRole} color="primary" fullWidth>
        {roles.map((role) => (
          <Tab key={role.key} title={role.name} />
        ))}
      </Tabs>

      <Divider />

      <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-1.5">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input label="Your email" autoFocus {...field} isInvalid={invalid} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input label="Your password" type="password" {...field} isInvalid={invalid} errorMessage={error?.message} />
          )}
        />
        <Button color="primary" type="submit" isLoading={isOrganizerLoading || isSponsorLoading}>
          Login
        </Button>
        <Button as={NextLink} href="/register" type="button" variant="light" color="primary">
          Create a new account
        </Button>
      </form>
    </div>
  );
}
