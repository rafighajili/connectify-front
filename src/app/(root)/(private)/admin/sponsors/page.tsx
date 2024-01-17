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

export default function AdminSponsorsPage() {
  const { data: contactsData } = useGetContactSponsorQuery();
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
        <h1 className="text-4xl">Sponsors</h1>
        <Button variant="ghost" onPress={onOpen}>
          Register a sponsor
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader className="flex-col">
              <h3>Register a sponsor</h3>

              {isSuccess && <p className="text-sm font-normal text-success-500">Registered successfully!</p>}
              {isError && <p className="text-sm font-normal text-danger-500">Occurred some error.</p>}
            </ModalHeader>

            <form onSubmit={handleSubmit(registerSponsor)}>
              <ModalBody className='className="flex gap-1.5" flex-col'>
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
                    <Input
                      label="Your password"
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

      {!contactsData ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactsData.map((contactData) => (
            <Card key={contactData.id}>
              <CardHeader>
                <p className="text-xl font-medium">{`${contactData.firstName} ${contactData.lastName}`}</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-3xl">{contactData.companyName}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex-col items-start">
                <p className="text-sm text-default-500">{contactData.email}</p>
                <p className="text-sm text-default-500">{contactData.phoneNumber}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
