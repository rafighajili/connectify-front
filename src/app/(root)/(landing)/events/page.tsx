"use client";

import { EventsSwiper } from "#/components";
import { useGetAllEventsQuery } from "#/services";
import { Chip } from "@nextui-org/react";
import { PartnersSection } from "../_components";

export default function EventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetAllEventsQuery({});

  return (
    <div className="space-y-24 [&>*]:space-y-6">
      <main>
        <div className="container">
          <h1 className="text-4xl font-medium">Popular Events</h1>
        </div>
        {isEventsLoading ? <EventsSwiper isLoading /> : events && <EventsSwiper events={events} />}
      </main>

      <section>
        <div className="container">
          <Chip size="lg" variant="flat" color="primary">
            Technology
          </Chip>
        </div>
        {isEventsLoading ? <EventsSwiper isLoading /> : events && <EventsSwiper events={events} />}
      </section>

      <section>
        <div className="container">
          <Chip size="lg" variant="flat" color="secondary">
            Business
          </Chip>
        </div>
        {isEventsLoading ? <EventsSwiper isLoading /> : events && <EventsSwiper events={events} />}
      </section>

      <PartnersSection />
    </div>
  );
}
