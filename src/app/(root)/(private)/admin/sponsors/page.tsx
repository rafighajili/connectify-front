"use client";

import { useGetContactSponsorQuery, useRegisterSponsorMutation } from "#/services";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { registerRequestSchema, RegisterRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { MyPagination } from "#/components";
import { useCurrentPage } from "#/utils";

export default function AdminSponsorsPage() {
  const { data, isFetching } = useGetContactSponsorQuery({ page: useCurrentPage() });
  const [registerSponsor, { isLoading, isSuccess, isError, reset: resetApi }] = useRegisterSponsorMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { control, handleSubmit, reset } = useForm<RegisterRequestType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: zodResolver(registerRequestSchema),
  });

  useEffect(() => {
    reset();
    resetApi();
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div className="space-y-12">
      <div className="flex items-start gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <h1 className="text-4xl font-medium">Sponsors</h1>
        <Button variant="ghost" onPress={onOpen}>
          Register a sponsor
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader className="flex-col items-start text-start">
              <h3 className="text-lg font-medium">Register a sponsor</h3>

              {isSuccess && <p className="text-sm text-success-500">Registered successfully!</p>}
              {isError && <p className="text-sm text-danger-500">Occurred some error.</p>}
            </ModalHeader>

            <form onSubmit={handleSubmit(registerSponsor)}>
              <ModalBody className='className="flex gap-1.5" flex-col'>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input label="Sponsor name" {...field} isInvalid={invalid} errorMessage={error?.message} />
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input label="Sponsor surname" {...field} isInvalid={invalid} errorMessage={error?.message} />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input label="Sponsor email" {...field} isInvalid={invalid} errorMessage={error?.message} />
                  )}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input
                      label="Sponsor phone number"
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
                    <Input
                      label="Sponsor password"
                      type="password"
                      {...field}
                      isInvalid={invalid}
                      errorMessage={error?.message}
                    />
                  )}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Register
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>

      {!data || isFetching ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((contactData) => (
            <Card key={contactData.id}>
              <CardHeader>
                <p className="text-xl font-medium">{contactData.companyName}</p>
              </CardHeader>
              <Divider />
              <CardBody className="grid grid-cols-2 gap-3">
                <Input isReadOnly label="First name" defaultValue={contactData.firstName} />
                <Input isReadOnly label="Last name" defaultValue={contactData.lastName} />
                <Input isReadOnly label="Email" defaultValue={contactData.email} />
                <Input isReadOnly label="Phone number" defaultValue={contactData.phoneNumber} />
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="text-sm text-default-500">
                  {new Date(contactData.createdAt).toLocaleDateString("en-UK")}{" "}
                  {new Date(contactData.createdAt).toLocaleTimeString("en-UK")}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {data && <MyPagination meta={data.meta} />}
    </div>
  );
}
