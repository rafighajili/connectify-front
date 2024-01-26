"use client";

import { useGetEventsQuery } from "#/services";
import { EventCard } from "#/components";

export default function AllEventsPage() {
  const { data, isLoading } = useGetEventsQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">All Events</h1>

      <div className="space-y-6">
        {isLoading || !data
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading hideStatus />)
          : data.data.map((eventData) => <EventCard key={eventData.id} eventData={eventData} hideStatus />)}
      </div>
    </div>
  );
}
