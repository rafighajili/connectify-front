"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import NextLink from "next/link";
import {
  useGetEventCategoriesQuery,
  useGetEventsQuery,
  useGetEventTypesQuery,
  useUpdateEventMutation,
} from "#/services";
import { EventCard } from "#/components";
import { EventType } from "#/entities";
import { Controller, useForm } from "react-hook-form";
import { UpdateEventRequest, updateEventRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery({});

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-x-36 gap-y-6">
        <h1 className="text-4xl font-medium">My events</h1>
        <Button variant="flat" radius="full" color="primary" as={NextLink} href="/o/create-event">
          Create a new event
        </Button>
      </div>

      <div className="space-y-6">
        {isEventsLoading ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          events && events.map((event) => <MyEvent key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}

function MyEvent({ event }: { event: EventType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();
  const [updateEvent, {}] = useUpdateEventMutation();

  const { control, handleSubmit } = useForm<UpdateEventRequest>({
    defaultValues: event,
    resolver: zodResolver(updateEventRequestSchema),
  });

  return (
    <>
      <EventCard event={event} actionTitle="Edit" onAction={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit your event</ModalHeader>

              <form onSubmit={handleSubmit(updateEvent)}>
                <ModalBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState: { invalid, error } }) => (
                      <Input label="Event name" {...field} isInvalid={invalid} errorMessage={error?.message} />
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
                    name="date"
                    render={({ field, fieldState: { invalid, error } }) => (
                      <Input
                        label="Event date"
                        type="datetime-local"
                        placeholder="date"
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
                </ModalBody>

                <ModalFooter>
                  <Button color="primary" size="lg" type="submit">
                    Create new event
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
