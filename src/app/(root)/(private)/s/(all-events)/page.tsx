"use client";

import { useGetAllEventsQuery } from "#/services";
import { EventCard } from "#/components";

export default function AllEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetAllEventsQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">All Events</h1>

      <div className="space-y-6">
        {isEventsLoading ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          events &&
          events.map((event) => (
            <EventCard key={event.id} eventData={event} actionTitle="Read mode" href={`/s/${event.id}`} />
          ))
        )}
      </div>
    </div>
  );
}
