"use client";

import { useGetEventsQuery } from "#/services";
import { EventCard, MyPagination } from "#/components";
import { useCurrentPage } from "#/utils";

export default function AllEventsPage() {
  const { data, isFetching } = useGetEventsQuery({ page: useCurrentPage() });

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">All Events</h1>

      <div className="space-y-6">
        {!data || isFetching
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading hideStatus />)
          : data.data.map((eventData) => <EventCard key={eventData.id} eventData={eventData} hideStatus />)}
      </div>

      {data && <MyPagination meta={data.meta} />}
    </div>
  );
}
