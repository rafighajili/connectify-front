"use client";

import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import { useGetAllEventsQuery } from "#/services";
import { EventCard } from "#/components";

export default function Page() {
  const { data: events, isLoading: isEventsLoading } = useGetAllEventsQuery({});

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
          events && events.map((event) => <EventCard key={event.id} {...event} />)
        )}
      </div>
    </div>
  );
}
