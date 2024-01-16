"use client";

import { useGetEventsQuery } from "#/services";
import { EventCard } from "#/components";

export default function MyEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My Events</h1>

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
            <EventCard key={event.id} event={event} actionTitle="Read mode" href={`/s/${event.id}`} />
          ))
        )}
      </div>
    </div>
  );
}
