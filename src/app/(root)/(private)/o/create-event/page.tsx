"use client";

import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useCreateEventMutation, useGetEventCategoriesQuery, useGetEventTypesQuery } from "#/services";
import { Controller, useForm } from "react-hook-form";
import { CreateEventRequest, createEventRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();
  const [createEvent, {}] = useCreateEventMutation();

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
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Event title" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Controller
            control={control}
            name="type"
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
                  eventTypes.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="categories"
            render={({ field, fieldState: { invalid, error } }) => (
              <Select
                label="Event categories"
                selectionMode="multiple"
                isLoading={isEventCategoriesLoading}
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {/* @ts-ignore */}
                {eventCategories &&
                  eventCategories.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="description"
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
            name="venue"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input label="Event venue address" {...field} isInvalid={invalid} errorMessage={error?.message} />
            )}
          />

          <Controller
            control={control}
            name="file"
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
            name="date"
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
            name="size"
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
            name="size"
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

          <Button color="primary" size="lg" className="sm:col-start-2" type="submit">
            Create new event
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
