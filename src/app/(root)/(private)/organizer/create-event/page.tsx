"use client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useCreateEventMutation } from "#/services";
import { useForm } from "react-hook-form";
import { createEventRequestSchema, CreateEventRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";
import { useEffect } from "react";

export default function CreateEventPage() {
  const [createEvent, { isLoading, isSuccess, isError }] = useCreateEventMutation();

  const { control, handleSubmit, reset } = useForm<CreateEventRequestType>({
    defaultValues: {
      name: "",
      venue: "",
      description: "",
      type: { id: "" },
      categories: [],
      date: "",
      file: {} as File,
      size: 0,
      packages: [
        { name: "BRONZE", price: 0, features: [{ name: "" }] },
        { name: "SILVER", price: 0, features: [{ name: "" }] },
        { name: "GOLD", price: 0, features: [{ name: "" }] },
        { name: "DIAMOND", price: 0, features: [{ name: "" }] },
      ],
    },
    resolver: zodResolver(createEventRequestSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Create an event</h1>

      <Card className="p-6">
        <CardHeader className="flex-col items-start text-start">
          <h3 className="text-lg font-medium">Enter details of your event</h3>

          {isSuccess && <p className="text-sm text-success-500">Your event was created successfully!</p>}
          {isError && <p className="text-sm text-danger-500">Occurred some error.</p>}
        </CardHeader>
        <form onSubmit={handleSubmit(createEvent)}>
          <CardBody>
            <EventFields control={control} />
          </CardBody>
          <CardFooter>
            <Button color="primary" size="lg" className="w-full" type="submit" isLoading={isLoading}>
              Create a new event
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
