"use client";

import { Button, Spinner } from "#/lib";
import { useGetAllEventsQuery } from "#/services/organiser";
import { Event } from "#/components";
import { ConnectifyPlusIcon } from "#/lib/icons";

export default function OPage() {
  const { data: events, isLoading } = useGetAllEventsQuery();

  return isLoading || !events ? (
    <Spinner className="mt-16" size="lg" />
  ) : (
    <div className="space-y-8 py-32">
      <div className="flex flex-wrap justify-between gap-x-32 gap-y-8">
        <h1 className="text-5xl font-medium">My events</h1>
        <Button size="lg" radius="full" startContent={<ConnectifyPlusIcon />}>
          Create an event
        </Button>
      </div>

      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </div>
  );
}
