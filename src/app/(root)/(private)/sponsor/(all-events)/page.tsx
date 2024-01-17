"use client";

import { useGetEventsQuery } from "#/services";
import { EventCard } from "#/components";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function AllEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">All Events</h1>

      <div className="space-y-6">
        {isEventsLoading || !events
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading />)
          : events.map((eventData) => (
              <EventCard
                key={eventData.id}
                eventData={eventData}
                endContent={
                  <Button
                    as={NextLink}
                    variant="light"
                    color="primary"
                    href={`/sponsor/${eventData.id}`}
                    endContent={<ArrowLongRightIcon className="h-4 w-4" />}
                  >
                    Read more
                  </Button>
                }
              />
            ))}
      </div>
    </div>
  );
}
