"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import {
  useDeleteEventMutation,
  useGetEventCategoriesQuery,
  useGetEventsOrganizedQuery,
  useGetEventTypesQuery,
  useUpdateEventMutation,
} from "#/services";
import { EventCard } from "#/components";
import { EventType } from "#/entities";
import { useForm } from "react-hook-form";
import { updateEventRequestSchema, UpdateEventRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFields } from "../_components";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function OrganizedEventsPage() {
  const { data, isLoading } = useGetEventsOrganizedQuery({});
  const { isLoading: isEventTypesLoading } = useGetEventTypesQuery();
  const { isLoading: isEventCategoriesLoading } = useGetEventCategoriesQuery();

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My events</h1>

      <div className="space-y-6">
        {isLoading || !data || isEventTypesLoading || isEventCategoriesLoading
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading />)
          : data.data.map((eventData) => <MyEvent key={eventData.id} eventData={eventData} />)}
      </div>
    </div>
  );
}

function MyEvent({ eventData }: { eventData: EventType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [updateEvent, { isLoading, isSuccess, isError, reset: resetApi }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleteLoading }] = useDeleteEventMutation();

  const { control, handleSubmit, reset, watch } = useForm<UpdateEventRequestType>({
    defaultValues: eventData,
    resolver: zodResolver(updateEventRequestSchema),
  });

  useEffect(() => {
    reset(eventData);
    resetApi();
  }, [isOpen]);

  console.log("watch()", watch("packages"));

  return (
    <>
      <EventCard
        eventData={eventData}
        footerContent={
          <div className="flex justify-between">
            <Button
              color="danger"
              variant="light"
              isLoading={isDeleteLoading}
              onPress={() => deleteEvent(eventData.id)}
            >
              Delete this event
            </Button>
            <Button
              color="primary"
              variant="ghost"
              onPress={onOpen}
              endContent={<PencilSquareIcon className="h-4 w-4" />}
            >
              Edit
            </Button>
          </div>
        }
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="outside">
        <ModalContent>
          <ModalHeader className="flex-col items-start text-start">
            <h3 className="text-lg font-medium">Edit your event</h3>

            {isSuccess && <p className="text-sm text-success-500">Your event was updated successfully!</p>}
            {isError && <p className="text-sm text-danger-500">Occurred some error.</p>}
          </ModalHeader>

          <form onSubmit={handleSubmit(updateEvent)}>
            <ModalBody>
              {/* @ts-ignore */}
              <EventFields control={control} />
            </ModalBody>

            <ModalFooter>
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
