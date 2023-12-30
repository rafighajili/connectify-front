"use client";

import { Button, Divider, Form, Tab, Tabs, TextInput } from "#/lib";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { LoginRequest, loginRequestSchema } from "#/schemas";
import { useLoginOrganizerMutation, useLoginSponsorMutation } from "#/services";
import { useState } from "react";
import { Key } from "react-stately";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
  const [currentRole, setCurrentRole] = useState<Key>(roles[0].key);
  const [loginOrganizer, { data: organizerData, isLoading: isOrganizerLoading }] = useLoginOrganizerMutation();
  const [loginSponsor, { data: sponsorData, isLoading: isSponsorLoading }] = useLoginSponsorMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
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

  if (organizerData) {
    router.push("/o");
  }

  if (sponsorData) {
    router.push("/s");
  }

  return (
    <Form onSubmit={handleSubmit(onLogin)} className="grid grid-cols-1 gap-4">
      <Tabs selectedKey={currentRole} onSelectionChange={setCurrentRole} color="primary" withoutPanel>
        {roles.map((role) => (
          <Tab key={role.key}>{role.name}</Tab>
        ))}
      </Tabs>

      <Divider />

      <TextInput
        label="Email"
        register={register("email")}
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
      />
      <TextInput
        label="Password"
        type="password"
        register={register("password")}
        isInvalid={!!errors.password?.message}
        errorMessage={errors.password?.message}
      />

      <Button type="submit" isLoading={isOrganizerLoading || isSponsorLoading}>
        Login to your account
      </Button>
      <Button elementType={NextLink} href="/register" type="button" radius="full" variant="light" color="secondary">
        Create a new account
      </Button>
    </Form>
  );
}
