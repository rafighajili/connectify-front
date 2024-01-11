"use client";

import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { RegisterRequest, registerRequestSchema, VerifyRequest, verifyRequestSchema } from "#/schemas";
import { useRegisterOrganizerMutation, useVerifyMutation } from "#/services";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

const RegisterContext = createContext<{
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  // @ts-ignore
}>(null);

export default function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  return (
    <RegisterContext.Provider value={{ isSuccess, setIsSuccess, email, setEmail }}>
      {isSuccess ? <VerificationForm /> : <RegisterForm />}
    </RegisterContext.Provider>
  );
}

function RegisterForm() {
  const { setIsSuccess, setEmail } = useContext(RegisterContext);

  const [registerOrganizer, { isLoading, isSuccess }] = useRegisterOrganizerMutation();

  const { control, handleSubmit, getValues } = useForm<RegisterRequest>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerRequestSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(true);
      setEmail(getValues("email"));
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(registerOrganizer)} className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name="firstname"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your name" autoFocus {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="lastname"
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
        name="password"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input label="Your password" type="password" {...field} isInvalid={invalid} errorMessage={error?.message} />
        )}
      />
      <Button color="primary" type="submit" isLoading={isLoading}>
        Register
      </Button>
      <Button as={NextLink} href="/login" type="button" variant="light" color="secondary">
        Login to your account
      </Button>
    </form>
  );
}

function VerificationForm() {
  const { email } = useContext(RegisterContext);

  const [verify, { isLoading, isSuccess }] = useVerifyMutation();

  const router = useRouter();

  const { control, handleSubmit } = useForm<VerifyRequest>({
    defaultValues: {
      email,
      verificationCode: "",
    },
    resolver: zodResolver(verifyRequestSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(verify)} className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name="verificationCode"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="Enter verification code"
            autoFocus
            {...field}
            isInvalid={invalid}
            errorMessage={error?.message}
          />
        )}
      />
      <Button color="primary" type="submit" isLoading={isLoading}>
        Verify your account
      </Button>
    </form>
  );
}
