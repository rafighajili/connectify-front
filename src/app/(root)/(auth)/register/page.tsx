"use client";

import { Button, Form, TextInput } from "#/lib";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { RegisterRequest, VerifyRequest, registerRequestSchema, verifyRequestSchema } from "#/schemas";
import { useRegisterOrganizerMutation, useVerifyMutation } from "#/services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const [registerOrganizer, { isLoading, isSuccess }] = useRegisterOrganizerMutation();
  const [verify, { isLoading: isVerifyLoading, isError }] = useVerifyMutation();
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerRequestSchema),
  });

  const {
    register: verifyRegister,
    handleSubmit: verifyHandleSubmit,
    formState: { errors: verifyErrors },
  } = useForm<VerifyRequest>({
    defaultValues: {
      verificationCode: "",
    },
    resolver: zodResolver(verifyRequestSchema),
  });

  const onRegister = async (values: RegisterRequest) => {
    await registerOrganizer(values);
    setEmail(values.email);
  };

  const onVerify = async (values: VerifyRequest) => {
    await verify({ ...values, email });
    router.push("/login");
  };

  return !isSuccess ? (
    <Form onSubmit={handleSubmit(onRegister)} className="grid grid-cols-2 gap-4 [&>*]:col-span-2">
      <TextInput
        label="Name"
        className="!col-span-1"
        register={register("firstname")}
        isInvalid={!!errors.firstname?.message}
        errorMessage={errors.firstname?.message}
      />
      <TextInput
        label="Surname"
        className="!col-span-1"
        register={register("lastname")}
        isInvalid={!!errors.lastname?.message}
        errorMessage={errors.lastname?.message}
      />
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

      <Button type="submit" isLoading={isLoading}>
        Create a new account
      </Button>
      <Button elementType={NextLink} href="/login" type="button" radius="full" variant="light" color="secondary">
        Login to your account
      </Button>
    </Form>
  ) : (
    <Form onSubmit={verifyHandleSubmit(onVerify)} className="flex flex-col gap-4">
      <TextInput
        label="Verification code"
        register={verifyRegister("verificationCode")}
        isInvalid={!!verifyErrors.verificationCode?.message}
        errorMessage={verifyErrors.verificationCode?.message}
      />

      <Button type="submit" isLoading={isVerifyLoading}>
        Verify account
      </Button>
    </Form>
  );
}
