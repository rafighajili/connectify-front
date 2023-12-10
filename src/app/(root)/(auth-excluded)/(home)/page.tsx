"use client";

import { Button, Divider, Tag, Tags } from "#/lib";
import Image from "next/image";
import { office, people } from "#/assets/images";
import { ConnectifyCheckIcon } from "#/lib/icons";

const events = [
  {
    title: "AI Hackathon",
    description: "19 January - AI based topics",
    features: [
      "Organise your data",
      "Business analytics",
      "Work with any team",
      "Always in sync",
      "Embedded analytics",
    ],
    tags: ["Technology", "AI"],
    img: office,
  },
  {
    title: "Event 2",
    description: "19 January - AI based topics",
    features: [
      "Organise your data",
      "Business analytics",
      "Work with any team",
      "Always in sync",
      "Embedded analytics",
    ],
    tags: ["Technology", "AI"],
    img: office,
  },
];

const faqs = [
  {
    question: "Smod tempor incididunt ut labore et dolore",
    answer: "",
  },
  {
    question: "Quis nostrud exercitation ullamco laboris",
    answer: "",
  },
  {
    question: "Woluptate velit esse cillum dolore eu fugiat nulla",
    answer: "",
  },
  {
    question: "Excepteur sint occaecat cupidatat non proiden",
    answer: "",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-64 pb-32">
      <main className="flex items-center pt-32 max-lg:flex-col max-lg:gap-y-32 lg:justify-between">
        <div className="flex flex-col gap-y-16 max-lg:items-center sm:w-[480px] lg:gap-y-32">
          <h1 className="text-5xl font-medium italic max-lg:text-center">We Connect Event Organizers with Sponsors</h1>
          <div className="flex gap-4">
            <Button color="secondary" radius="full" size="lg">
              I am Event Organizer
            </Button>
            <Button color="secondary" variant="bordered" radius="full" size="lg">
              I am Sponsor
            </Button>
          </div>
        </div>

        <Image src={people} alt="people" className="[filter:drop-shadow(0_0_25px_rgb(255_255_255/0.25))]" />
      </main>

      <section>
        <h1 className="text-center text-5xl font-medium">Events need Sponsor</h1>

        <div className="mt-16 space-y-16">
          {events.map((event) => (
            <div key={event.title} className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 xl:gap-x-32">
              <Image src={event.img} alt={event.title} className="h-auto w-full rounded-3xl" />

              <div>
                <Tags aria-label={`Tags of ${event.title}`}>
                  {event.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>

                <h2 className="my-2 text-4xl font-medium">{event.title}</h2>

                <p className="text-sm text-default-500">{event.description}</p>

                <Divider className="my-4" />

                <div className="grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2">
                  {event.features.map((feature, key) => (
                    <div key={key} className="flex items-center gap-x-4">
                      <div className="h-5 w-5 rounded-full bg-success-500 p-0.5 text-default-0">
                        <ConnectifyCheckIcon />
                      </div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-center text-5xl font-medium">Frequently Asked Questions</h1>

        <p className="mt-8 text-center text-default-500">We haveput together some commonly asked questions</p>

        <div className="mt-8 w-full divide-y divide-default-1000/20 border-y border-default-1000/20 sm:mx-auto sm:w-[600px]">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8">
              <h3 className="text-xl font-medium">{faq.question}</h3>
              <p className="mt-8 text-default-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, enim, quibusdam? Cumque dolore ipsa
                molestias sint. Accusamus amet culpa deserunt dolore dolores hic itaque magni maxime minima nihil,
                obcaecati optio perferendis porro possimus provident, quo similique soluta suscipit veniam, voluptatem.
                Autem illum inventore ut voluptatem. Aperiam blanditiis fugiat pariatur tempore.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
