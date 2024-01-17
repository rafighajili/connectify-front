"use client";

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCreateEventMutation } from "#/services";
import { useForm } from "react-hook-form";
import { createEventRequestSchema, CreateEventRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";

export default function CreateEventPage() {
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventRequestType>({
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
        { name: "BRONZE", price: 0, features: [{ name: "" }, { name: "" }, { name: "" }] },
        { name: "SILVER", price: 0, features: [{ name: "" }, { name: "" }, { name: "" }] },
        { name: "GOLD", price: 0, features: [{ name: "" }, { name: "" }, { name: "" }] },
        { name: "DIAMOND", price: 0, features: [{ name: "" }, { name: "" }, { name: "" }] },
      ],
    },
    resolver: zodResolver(createEventRequestSchema),
  });

  return (
    <Card classNames={{ base: "p-6" }}>
      <CardHeader>
        <h1 className="text-xl font-medium">Enter details of your event</h1>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmit((values) => {
            console.log("values", values);
            createEvent(values);
          })}
        >
          <EventFields control={control} />

          <Button color="primary" size="lg" className="w-full" type="submit" isLoading={isLoading}>
            Create a new event
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
