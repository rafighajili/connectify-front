"use client";

import { Accordion, AccordionItem, Button, Chip, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { EventsSwiper } from "#/components";
import { MainSection, PartnersSection } from "../_components";
import { useGetEventsQuery } from "#/services";

export default function HomePage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsQuery({});

  return (
    <>
      <MainSection>
        <div className="space-y-12">
          <h1 className="text-4xl font-medium">
            Simplifying the process of finding events and sponsors to reach the target audience.
          </h1>
          <div className="flex flex-wrap gap-3">
            <Button as={NextLink} href="/organizers" radius="full" color="primary">
              I am an Event Organizer
            </Button>
            <Button as={NextLink} href="/sponsors" radius="full" color="primary" variant="bordered">
              I am a Sponsor
            </Button>
          </div>
        </div>
      </MainSection>

      <PartnersSection />

      <section className="space-y-12 py-24 text-center">
        <h1 className="text-5xl font-medium">Latest Events</h1>

        {isEventsLoading || !events ? <EventsSwiper isLoading /> : <EventsSwiper events={events} />}

        <Button
          variant="faded"
          radius="full"
          color="primary"
          size="lg"
          className="mx-auto"
          as={NextLink}
          href="/events"
        >
          Load more...
        </Button>
      </section>

      <section className="container flex flex-col items-center gap-y-6 py-24">
        <Chip color="danger" variant="flat">
          FAQs
        </Chip>

        <h1 className="text-center text-5xl font-medium">Frequently Asked Questions</h1>

        <p className="text-center text-default-500">We have put together some commonly asked questions</p>

        <Accordion variant="shadow" className="sm:mx-auto sm:w-2/3">
          <AccordionItem key="1" title="What is Connectify?">
            Connectify provides a platform for both event organizers and sponsors. Event organizers can input all the
            details about their event, and sponsor companies can easily assess whether the event aligns with their
            sponsorship criteria.
          </AccordionItem>
          <AccordionItem key="2" title="How it works for sponsors?">
            Sponsors can browse through listed events, review the available sponsorship packages and submit sponsorship
            requests for the desired event.
          </AccordionItem>
          <AccordionItem key="3" title="How it works for organizers?">
            Event organizers can input comprehensive event details and create sponsorship packages (such as gold,
            silver, and bronze) that they offer to potential sponsors.
          </AccordionItem>
          <AccordionItem key="4" title="How the process is going?">
            Whenever sponsor apply for specific event, organizer check and decide whether it is suitable or not.
          </AccordionItem>
        </Accordion>

        <div className="rounded-full bg-default-100 px-6 py-1.5 text-center">
          <span>Didn’t find what you’re looking for? </span>
          <Link as={NextLink} href="/contact" color="danger" underline="always">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
