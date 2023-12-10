"use client";

import { Button, Form, TextInput } from "#/lib";
import { useForm } from "react-hook-form";
import { LoginRequest } from "#/schemas";
import { useLoginAdminMutation } from "#/services";

export default function AdminPage() {
  const [loginAdmin, { data, isLoading }] = useLoginAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (values: LoginRequest) => {
    await loginAdmin(values);
    if (data) {
      localStorage.setItem("access_token", data.access_token);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onLogin)} className="grid grid-cols-1 gap-4">
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
        Login as an admin
      </Button>
    </Form>
  );
}
