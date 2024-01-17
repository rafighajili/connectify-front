"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard } from "#/components";

export default function SponsoredEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsSponsoredQuery();

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My Events</h1>

      <div className="space-y-6">
        {isEventsLoading || !events ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} actionTitle="Read mode" href={`/s/${event.id}`} />
          ))
        )}
      </div>
    </div>
  );
}
