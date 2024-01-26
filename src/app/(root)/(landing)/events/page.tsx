"use client";

import { EventsSwiper } from "#/components";
import { useGetEventsQuery } from "#/services";
import { Chip } from "@nextui-org/react";
import { PartnersSection } from "../_components";

export default function EventsPage() {
  const { data, isLoading } = useGetEventsQuery({});

  return (
    <div className="space-y-24 [&>*]:space-y-6">
      <main>
        <div className="container">
          <h1 className="text-4xl font-medium">Popular Events</h1>
        </div>
        {isLoading || !data ? <EventsSwiper isLoading /> : <EventsSwiper events={data.data} />}
      </main>

      <section>
        <div className="container">
          <Chip size="lg" variant="flat" color="primary">
            Technology
          </Chip>
        </div>
        {isLoading || !data ? <EventsSwiper isLoading /> : <EventsSwiper events={data.data} />}
      </section>

      <section>
        <div className="container">
          <Chip size="lg" variant="flat" color="secondary">
            Business
          </Chip>
        </div>
        {isLoading || !data ? <EventsSwiper isLoading /> : <EventsSwiper events={data.data} />}
      </section>

      <PartnersSection />
    </div>
  );
}
