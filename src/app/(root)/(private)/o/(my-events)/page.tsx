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
import { useGetAllEventsQuery, useGetEventTypesQuery, useUpdateEventMutation } from "#/services";
import { EventCard } from "#/components";
import { Event } from "#/entities";
import { Controller, useForm } from "react-hook-form";
import { UpdateEventRequest, updateEventRequestSchema } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const { data: events, isLoading: isEventsLoading } = useGetAllEventsQuery({});
  const { data: eventTypes, isLoading: isEventTypesLoading } = useGetEventTypesQuery();

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-x-36 gap-y-6">
        <h1 className="text-4xl font-medium">My events</h1>
        <Button variant="flat" radius="full" color="primary" as={NextLink} href="/o/create-event">
          Create a new event
        </Button>
      </div>

      <div className="space-y-6">
        {isEventsLoading || isEventTypesLoading ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          events &&
          eventTypes &&
          events.map((event) => <MyEvent key={event.id} eventData={event} eventTypes={eventTypes} />)
        )}
      </div>
    </div>
  );
}

function MyEvent({ eventData, eventTypes }: { eventData: Event; eventTypes: string[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [updateEvent, {}] = useUpdateEventMutation();

  const { control, handleSubmit } = useForm<UpdateEventRequest>({
    defaultValues: eventData,
    resolver: zodResolver(updateEventRequestSchema),
  });

  const onSubmit = async (values: UpdateEventRequest) => {
    await updateEvent({ eventId: eventData.id });
  };

  return (
    <>
      <EventCard eventData={eventData} actionTitle="Edit" onAction={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit your event</ModalHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                      <Select label="Event type" {...field} isInvalid={invalid} errorMessage={error?.message}>
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
                      <Input
                        label="Needed sponrship cash"
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
