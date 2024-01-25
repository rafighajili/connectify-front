"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import {
  updateUserInfoRequestSchema,
  UpdateUserInfoRequestType,
  updateUserPasswordRequestSchema,
  UpdateUserPasswordRequestType,
} from "#/schemas";
import { useUpdateUserMutation } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";
import { DevicePhoneMobileIcon, EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <Card className="p-3 lg:p-6">
      <CardHeader className="text-xl font-medium">Account settings</CardHeader>
      <CardBody className="grid gap-6 sm:grid-cols-2 [&>div]:h-fit">
        <UserInfoForm />
        <UserPasswordForm />
      </CardBody>
    </Card>
  );
}

function UserInfoForm() {
  const { user } = useAppSelector(selectAuth);
  const [updateUser, { isLoading, isSuccess, isError }] = useUpdateUserMutation();

  const { control, handleSubmit } = useForm<UpdateUserInfoRequestType>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber.slice(4),
      // file: {} as File,
    },
    resolver: zodResolver(updateUserInfoRequestSchema),
  });

  return (
    <Card>
      <CardHeader className="flex-col items-start text-start">
        <h3 className="text-lg font-medium">Update Account Information</h3>

        {isSuccess && <p className="text-success-500">Your account info was updated successfully!</p>}
        {isError && <p className="text-danger-500">Occurred some error.</p>}
      </CardHeader>
      <form onSubmit={handleSubmit(updateUser)}>
        <CardBody className="flex flex-col gap-1.5">
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
              <Input
                label="Your email"
                endContent={<EnvelopeIcon className="h-6 w-6 text-default-500" />}
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
                label="Your phone number"
                startContent={<span className="text-sm text-default-500">+944</span>}
                endContent={<DevicePhoneMobileIcon className="h-6 w-6 text-default-500" />}
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  name="file"*/}
          {/*  render={({ field, fieldState: { invalid, error } }) => (*/}
          {/*    <Input*/}
          {/*      label="Your image"*/}
          {/*      type="file"*/}
          {/*      accept="image/*"*/}
          {/*      placeholder="event image"*/}
          {/*      classNames={{ input: "file:hidden cursor-pointer" }}*/}
          {/*      {...field}*/}
          {/*      // @ts-ignore*/}
          {/*      value={field.value?.fileName}*/}
          {/*      onChange={(event) => {*/}
          {/*        // @ts-ignore*/}
          {/*        field.onChange(event.target.files[0]);*/}
          {/*      }}*/}
          {/*      isInvalid={invalid}*/}
          {/*      errorMessage={error?.message}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*/>*/}
        </CardBody>

        <CardFooter className="justify-end">
          <Button color="primary" type="submit" isLoading={isLoading}>
            Update your info
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function UserPasswordForm() {
  const [updateUser, { isLoading, isSuccess, isError }] = useUpdateUserMutation();

  const { control, handleSubmit } = useForm<UpdateUserPasswordRequestType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(updateUserPasswordRequestSchema),
  });

  return (
    <Card>
      <CardHeader className="flex-col items-start text-start">
        <h3 className="text-lg font-medium">Update Account Password</h3>

        {isSuccess && <p className="text-success-500">Your account password was updated successfully!</p>}
        {isError && <p className="text-danger-500">Occurred some error.</p>}
      </CardHeader>
      <form onSubmit={handleSubmit(updateUser)}>
        <CardBody className="flex flex-col gap-1.5">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Old password"
                type="password"
                endContent={<KeyIcon className="h-6 w-6 text-default-500" />}
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="New password"
                type="password"
                endContent={<KeyIcon className="h-6 w-6 text-default-500" />}
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        </CardBody>

        <CardFooter className="justify-end">
          <Button color="primary" type="submit" isLoading={isLoading}>
            Update your password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
