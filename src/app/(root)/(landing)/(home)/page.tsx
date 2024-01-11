"use client";

import Image from "next/image";
import { Accordion, AccordionItem, Button, Chip, Link } from "@nextui-org/react";
import { gdgBaku, gdscBeu, goup, people, speKhazar, wtmBaku } from "#/assets/images";
import NextLink from "next/link";
import { useGetAllEventsQuery } from "#/services/organiser";
import { Event } from "#/components";

const partners = [
  {
    imgSrc: gdscBeu,
    name: "GDSC BEU",
    link: "https://www.instagram.com/gdsc.beu?igsh=eWdqejQzOTlpOXE=",
  },
  {
    imgSrc: speKhazar,
    name: "SPE Khazar",
    link: "https://www.instagram.com/spe.khazar?igsh=YWlncWV2eHdiY21z",
  },
  {
    imgSrc: wtmBaku,
    name: "Women Techmakers Baku",
    link: "https://www.instagram.com/wtm.baku?igsh=aGZudG1iaDVnamgx",
  },
  {
    imgSrc: gdgBaku,
    name: "GDG Baku",
    link: "https://www.instagram.com/gdg.baku?igsh=cXlvdWZjbHlqMWR6",
  },
  {
    imgSrc: goup,
    name: "GOUP",
    link: "https://www.linkedin.com/company/goupaz/",
  },
];

export default function HomePage() {
  const { data: events } = useGetAllEventsQuery();

  return (
    <div className="overflow-x-clip overflow-y-visible">
      <main className="container grid grid-cols-1 items-center gap-12 py-24 sm:grid-cols-2">
        <div className="z-10 space-y-12">
          <h1 className="text-5xl font-medium">We connect event organizers and sponsors</h1>
          <div className="flex flex-wrap gap-3">
            <Button as={NextLink} href="/organizers" radius="full" color="primary">
              I am an Event Organizer
            </Button>
            <Button as={NextLink} href="/sponsors" radius="full" color="primary" variant="bordered">
              I am a Sponsor
            </Button>
          </div>
        </div>

        <div className="relative z-0">
          <Image src={people} alt="Networking" />
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute -bottom-48 -left-48 -z-10"
            width={1200}
            height={1200}
          >
            <path
              d="M44.7,-36.8C55.1,-22.5,58.8,-4.1,56.9,16.4C54.9,36.8,47.2,59.4,29.8,71.5C12.4,83.5,-14.7,85.1,-37.2,75.1C-59.7,65.1,-77.7,43.5,-77.7,23.5C-77.6,3.5,-59.5,-14.8,-43.6,-30.3C-27.6,-45.8,-13.8,-58.5,1.6,-59.9C17.1,-61.2,34.2,-51.1,44.7,-36.8Z"
              transform="translate(100 100)"
              className="fill-primary-50"
            />
          </svg>
        </div>
      </main>

      <section className="container py-24">
        <div className="flex flex-wrap items-center justify-center gap-16">
          <h1 className="text-xl font-medium">Event Partners</h1>
          {partners.map((partner) => (
            <NextLink key={partner.name} href={partner.link} target="_blank">
              <Image src={partner.imgSrc} alt={partner.name} className="h-24 w-auto" />
            </NextLink>
          ))}
        </div>
      </section>

      <section className="container space-y-12 py-24 text-center">
        <h1 className="text-5xl font-medium">Latest Events</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {events?.slice(0, 4).map((event) => <Event key={event.id} {...event} />)}
        </div>

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

        <p className="text-default-500 text-center">We have put together some commonly asked questions</p>

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

        <div className="bg-default-100 rounded-full px-6 py-1.5">
          <span>Didn’t find what you’re looking for? </span>
          <Link as={NextLink} href="/contact" color="danger" underline="always">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
