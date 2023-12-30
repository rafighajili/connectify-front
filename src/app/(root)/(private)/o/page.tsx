"use client";

import {
  Button,
  Card,
  DialogBody,
  DialogHeader,
  DialogTrigger,
  ModalDialog,
  NumberInput,
  Spinner,
  Tags,
  Textarea,
  TextInput,
} from "#/lib";
import { useGetAllEventsQuery } from "#/services/organiser";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Item } from "react-stately";

export default function OrganizerPage() {
  const { data: events, isLoading } = useGetAllEventsQuery();

  const eventDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-UK", { day: "numeric", month: "long" });
  };

  return (
    <div className="space-y-16 xl:mx-auto xl:w-3/4">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <h1 className="text-4xl font-medium">My events</h1>

        <DialogTrigger>
          <Button size="lg" color="primary" radius="full">
            Add a new event
          </Button>
          <ModalDialog size="sm">
            <DialogHeader>
              <h3 className="text-center text-xl font-medium">Create an event</h3>
            </DialogHeader>
            <DialogBody>
              <form className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Name of event" autoFocus />
                <TextInput label="Destination of event" />
                <TextInput label="Date of event" type="date" />
                <NumberInput label="The number of participants" />

                <Tags label="Select event type(s)" selectionMode="multiple" className="sm:col-span-2">
                  <Item key="CHARITY">CHARITY</Item>
                  <Item key="CONFERENCE">CONFERENCE</Item>
                  <Item key="FESTIVAL">FESTIVAL</Item>
                  <Item key="FORUM">FORUM</Item>
                  <Item key="WORKSHOP">WORKSHOP</Item>
                </Tags>

                <Textarea label="Description of event" className="sm:col-span-2" />

                <div className="flex justify-end sm:col-span-2">
                  <Button>Create an event</Button>
                </div>
              </form>
            </DialogBody>
          </ModalDialog>
        </DialogTrigger>
      </div>

      {isLoading ? (
        <Spinner size="lg" />
      ) : !events?.length ? (
        "no data"
      ) : (
        <div className="space-y-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden sm:grid sm:grid-cols-2">
              <Image src={event.s3Key} alt={event.eventTitle} className="h-72 w-full" width={480} height={360} />

              <div className="flex h-72 flex-col gap-y-4 p-6">
                <div
                  className={twMerge(
                    event.eventStatus === "APPROVED" ? "bg-success-500" : "bg-warning-500",
                    "w-fit rounded-full px-4 py-2 text-sm text-default-0",
                  )}
                >
                  {event.eventStatus}
                </div>

                <h3 className="line-clamp-1 text-2xl font-medium">{event.eventTitle}</h3>

                <p className="line-clamp-3">{event.eventDescription}</p>

                <div className="mt-auto flex items-center justify-between">
                  <Button variant="light" radius="full" color="danger" endContent={<ArrowRightIcon />}>
                    Read more
                  </Button>

                  <p className="text-default-700">{eventDate(event.eventStartDate)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
