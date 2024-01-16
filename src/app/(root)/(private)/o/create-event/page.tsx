"use client";

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCreateEventMutation } from "#/services";
import { useForm } from "react-hook-form";
import { CreateEventRequest, createEventRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";

export default function Page() {
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const { control, handleSubmit } = useForm<CreateEventRequest>({
    resolver: zodResolver(createEventRequestSchema),
  });

  return (
    <Card classNames={{ base: "p-6" }}>
      <CardHeader>
        <h1 className="text-xl font-medium">Enter details of your event</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(createEvent)} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <EventFields control={control} />

          <Button color="primary" size="lg" className="sm:col-start-2" type="submit" isLoading={isLoading}>
            Create new event
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
