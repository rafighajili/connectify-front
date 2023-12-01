import { useWindowSize } from "usehooks-ts";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Button, DialogBody, DialogHeader, DialogTrigger, Divider, Form, Link, ModalDialog, TextInput } from "#/lib";
import { useLoginMutation, useRegisterMutation } from "#/services";
import { useForm } from "react-hook-form";
import { LoginRequest, loginRequestSchema, RegisterRequest, registerRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectifyLogo } from "#/components";

type FormTypes = "login" | "register";

interface AuthFormProps {
  setFormMode: Dispatch<SetStateAction<FormTypes>>;
  close: () => void;
}

export function AuthModal({ close, mode }: Pick<AuthFormProps, "close"> & { mode: FormTypes }) {
  const { width } = useWindowSize();

  const [formMode, setFormMode] = useState<FormTypes>(mode);

  const formRender: Record<FormTypes, ReactNode> = {
    login: <LoginForm {...{ setFormMode, close }} />,
    register: <RegisterForm {...{ setFormMode, close }} />,
  };

  return (
    <ModalDialog>
      <DialogHeader>
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-medium text-default-700">Sign in</h3>
          <p className="text-sm text-default-500">Enter your email and password</p>
        </div>
      </DialogHeader>

      <DialogBody className="gap-8 pt-8 max-sm:flex max-sm:flex-col-reverse sm:grid sm:grid-cols-[1fr,auto,1fr]">
        <div className="flex flex-col justify-between gap-y-8">
          <div className="grid flex-1 place-items-center">
            <ConnectifyLogo />
          </div>

          <p className="pt-8 text-center text-sm text-default-700">
            By continuing, you agree to our <Link href="#">User Agreement</Link>, <Link href="#">Privacy Policy</Link>{" "}
            and <Link href="#">Cookies Policy</Link>.
          </p>
        </div>

        <Divider orientation={width > 640 ? "vertical" : "horizontal"} />

        {formRender[formMode]}
      </DialogBody>
    </ModalDialog>
  );
}

function LoginForm({ setFormMode, close }: AuthFormProps) {
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginRequestSchema),
    reValidateMode: "onBlur",
  });

  const onLogin = async (loginData: LoginRequest) => {
    await login(loginData);
    isSuccess && close();
  };

  return (
    <Form onSubmit={handleSubmit(onLogin)} className="space-y-8">
      <TextInput
        label="Email"
        isRequired
        autoFocus
        register={register("email")}
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
      />

      <div className="space-y-2">
        <TextInput
          label="Password"
          type="password"
          isRequired
          register={register("password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />
        <DialogTrigger>
          <Button variant="light" color="secondary" size="sm" radius="full" className="ml-auto">
            Forgot password?
          </Button>
          <ForgotModal />
        </DialogTrigger>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-8">
        <Button variant="soft" type="button" onPress={() => setFormMode("register")}>
          Sign up
        </Button>
        <Button color="primary" type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </div>
    </Form>
  );
}

function RegisterForm({ setFormMode, close }: AuthFormProps) {
  const [registerUser, { isLoading, isSuccess }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: { email: "", password: "", username: "" },
    resolver: zodResolver(registerRequestSchema),
    reValidateMode: "onBlur",
  });

  const onRegister = async (registerData: RegisterRequest) => {
    await registerUser(registerData);
    isSuccess && close();
  };

  return (
    <Form onSubmit={handleSubmit(onRegister)} className="space-y-8">
      <TextInput
        label="Username"
        isRequired
        autoFocus
        register={register("username")}
        isInvalid={!!errors.username?.message}
        errorMessage={errors.username?.message}
      />

      <TextInput
        label="Email"
        isRequired
        register={register("email")}
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
      />

      <TextInput
        label="Password"
        type="password"
        isRequired
        register={register("password")}
        isInvalid={!!errors.password?.message}
        errorMessage={errors.password?.message}
      />

      <div className="flex flex-col gap-y-2 pt-8">
        <div className="flex items-center justify-center gap-x-2">
          <p className="text-xs text-default-700">Already have an account?</p>
          <Button variant="light" color="secondary" size="sm" radius="full" onPress={() => setFormMode("login")}>
            Sign in
          </Button>
        </div>

        <Button color="primary" type="submit" isLoading={isLoading}>
          Register
        </Button>
      </div>
    </Form>
  );
}

function ForgotModal() {
  return (
    <ModalDialog size="sm" backdrop="blur">
      <DialogHeader>
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-medium text-default-700">Reset password</h3>
          <p className="text-sm text-default-500">Enter your email</p>
        </div>
      </DialogHeader>

      <DialogBody>
        <Form className="flex flex-col gap-y-8">
          <TextInput label="Email" isRequired autoFocus />

          <Button color="primary" type="submit">
            Send email
          </Button>
        </Form>
      </DialogBody>
    </ModalDialog>
  );
}
