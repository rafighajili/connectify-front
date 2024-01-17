"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useGetEventsOrganizedQuery, useUpdateEventMutation } from "#/services";
import { EventCard } from "#/components";
import { EventType } from "#/entities";
import { useForm } from "react-hook-form";
import { updateEventRequestSchema, UpdateEventRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function OrganizedEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsOrganizedQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My events</h1>

      <div className="space-y-6">
        {isEventsLoading || !events
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading />)
          : events.map((eventData) => <MyEvent key={eventData.id} eventData={eventData} />)}
      </div>
    </div>
  );
}

function MyEvent({ eventData }: { eventData: EventType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const { control, handleSubmit, reset } = useForm<UpdateEventRequestType>({
    defaultValues: eventData,
    resolver: zodResolver(updateEventRequestSchema),
  });

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <>
      <EventCard
        eventData={eventData}
        endContent={
          <Button
            color="primary"
            variant="light"
            onPress={onOpen}
            endContent={<PencilSquareIcon className="h-4 w-4" />}
          >
            Edit
          </Button>
        }
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="outside">
        <ModalContent>
          <ModalHeader>Edit your event</ModalHeader>

          <form onSubmit={handleSubmit(updateEvent)}>
            <ModalBody>
              {/* @ts-ignore */}
              <EventFields control={control} />
            </ModalBody>

            <ModalFooter>
              <Button variant="light" color="danger" size="lg" type="submit" isLoading={isLoading}>
                Delete this event
              </Button>
              <Button color="primary" size="lg" type="submit" isLoading={isLoading}>
                Edit this event
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
