"use client";

import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useCreateEventMutation, useGetEventTypesQuery } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { CreateEventRequest, createEventRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "#/store";
import { selectAuth } from "#/store/slices";

export default function Page() {
  const { user } = useAppSelector(selectAuth);
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const [createEvent, {}] = useCreateEventMutation();

  const { watch, control, handleSubmit } = useForm<CreateEventRequest>({
    resolver: zodResolver(createEventRequestSchema),
  });

  const onSubmit = async (values: CreateEventRequest) => {
    if (user) {
      await createEvent({ ...values, userId: user.id });
    }
  };

  return (
    <Card classNames={{ base: "p-6" }}>
      <CardHeader>
        <h1 className="text-xl font-medium">Enter details of your event</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Controller
            control={control}
            name="eventTitle"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Event title" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Controller
            control={control}
            name="eventType"
            render={({ field, fieldState: { invalid, error } }) => (
              <Select
                label="Event type"
                isLoading={isEventTypesLoading}
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {/* @ts-ignore */}
                {eventTypes &&
                  eventTypes.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="eventDescription"
            render={({ field, fieldState: { invalid, error } }) => (
              <Textarea
                label="Event description"
                className="sm:col-span-2"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="eventVenueAddress"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Event venue address" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Controller
            control={control}
            name="eventImage"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Event image"
                type="file"
                accept="image/*"
                placeholder="event image"
                {...field}
                // @ts-ignore
                value={field.value?.fileName}
                onChange={(event) => {
                  // @ts-ignore
                  field.onChange(event.target.files[0]);
                }}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="eventStartDate"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Event start date"
                type="datetime-local"
                placeholder="start date"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="eventEndDate"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Event end date"
                type="datetime-local"
                placeholder="end date"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="estimatedCrowdSize"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Estimated crowd size"
                type="number"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="committeeSize"
            render={({ field, fieldState: { invalid, error } }) => (
              // @ts-ignore
              <Input
                label="Committee size"
                type="number"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="clubName"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Club name" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Controller
            control={control}
            name="cashSponsorshipNeeded"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Needed sponrship cash" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Button color="primary" size="lg" className="sm:col-start-2" type="submit">
            Create new event
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
