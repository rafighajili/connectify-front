"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import NextLink from "next/link";
import { useGetEventsOrganizedQuery, useUpdateEventMutation } from "#/services";
import { EventCard } from "#/components";
import { EventType } from "#/entities";
import { useForm } from "react-hook-form";
import { updateEventRequestSchema, UpdateEventRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";

export default function OrganizedEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsOrganizedQuery();

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-x-36 gap-y-6">
        <h1 className="text-4xl font-medium">My events</h1>
        <Button variant="flat" radius="full" color="primary" as={NextLink} href="/organizer/create-event">
          Create a new event
        </Button>
      </div>

      <div className="space-y-6">
        {isEventsLoading || !events ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          events.map((event) => <MyEvent key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}

function MyEvent({ event }: { event: EventType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const { control, handleSubmit } = useForm<UpdateEventRequestType>({
    // defaultValues: event,
    resolver: zodResolver(updateEventRequestSchema),
  });

  return (
    <>
      <EventCard event={event} actionTitle="Edit" onAction={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="outside">
        <ModalContent>
          <ModalHeader>Edit your event</ModalHeader>

          <form onSubmit={handleSubmit(updateEvent)}>
            <ModalBody>
              <EventFields control={control} />
            </ModalBody>

            <ModalFooter>
              <Button color="primary" size="lg" type="submit" isLoading={isLoading}>
                Create new event
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
