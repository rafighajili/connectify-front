"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard } from "#/components";

export default function SponsoredEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsSponsoredQuery({});

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
          events.map((eventData) => (
            <EventCard
              key={eventData.id}
              eventData={eventData}
              actionTitle="Read mode"
              href={`/sponsor/${eventData.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
