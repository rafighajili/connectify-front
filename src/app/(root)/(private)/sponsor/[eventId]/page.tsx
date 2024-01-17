"use client";

import { useGetEventQuery } from "#/services";
import { Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { PackageCard } from "#/components";

export default function EventPage({ params: { eventId } }: { params: { eventId: string } }) {
  const { data: event } = useGetEventQuery(eventId);

  return (
    <div className="space-y-12">
      {event ? <h1 className="text-4xl font-medium">{event.name}</h1> : <Skeleton className="h-10 rounded-lg" />}

      <div className="flex gap-6 max-lg:flex-col lg:justify-between">
        {event ? (
          <Chip size="lg" color="primary" variant="flat">
            {event.type.name}
          </Chip>
        ) : (
          <Skeleton className="h-8 w-36 rounded-full" />
        )}

        <div className="flex gap-3 max-sm:flex-col">
          {event ? (
            <>
              <Chip size="lg" variant="bordered" startContent={<UsersIcon className="h-6 w-6" />}>
                {event.size}
              </Chip>

              <Tooltip content={event.venue} delay={0} closeDelay={200}>
                <Chip size="lg" variant="bordered" startContent={<MapPinIcon className="h-6 w-6" />}>
                  <p className="w-36 cursor-default overflow-hidden text-ellipsis whitespace-nowrap">{event.venue}</p>
                </Chip>
              </Tooltip>

              <Chip size="lg" variant="bordered" startContent={<CalendarDaysIcon className="h-6 w-6" />}>
                {new Date(event.date).toLocaleDateString("en-UK")}
              </Chip>

              <Chip size="lg" variant="bordered" startContent={<ClockIcon className="h-6 w-6" />}>
                {new Date(event.date).toLocaleTimeString("en-UK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Chip>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </>
          )}
        </div>
      </div>

      {event ? (
        <Image
          alt={event.name}
          className="h-72 w-full rounded-xl object-cover "
          src={event.imageUrl}
          height={1600}
          width={900}
        />
      ) : (
        <Skeleton className="h-72 w-full rounded-xl" />
      )}

      {event ? (
        <p>{event.description}</p>
      ) : (
        <div className="space-y-2 py-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {event && (
        <div>
          <h3 className="text-xl">Sponsorship packets:</h3>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PackageCard
              type="silver"
              features={[
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
              ]}
              price={500}
              event={event}
            />

            <PackageCard
              type="diamond"
              features={[
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
              ]}
              price={2500}
              event={event}
            />

            <PackageCard
              type="gold"
              features={[
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
                "Lorem ipsum dolor sit amet.",
              ]}
              price={1500}
              event={event}
            />
          </div>
        </div>
      )}
    </div>
  );
}
