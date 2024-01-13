"use client";

import { Key } from "react";
import { useGetEventQuery } from "#/services";
import { Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { PackageCard } from "#/components";

export default function EventPage({ params: { eventId } }: { params: { eventId: Key } }) {
  const { data: eventData } = useGetEventQuery(eventId);

  return (
    <div className="space-y-12">
      {eventData ? (
        <h1 className="text-4xl font-medium">{eventData.eventTitle}</h1>
      ) : (
        <Skeleton className="h-10 rounded-lg" />
      )}

      <div className="flex gap-6 max-lg:flex-col lg:justify-between">
        {eventData ? (
          <Chip size="lg" color="primary" variant="flat">
            {eventData.eventType}
          </Chip>
        ) : (
          <Skeleton className="h-8 w-36 rounded-full" />
        )}

        <div className="flex gap-3 max-sm:flex-col">
          {eventData ? (
            <>
              <Chip size="lg" variant="bordered" startContent={<UsersIcon className="h-6 w-6" />}>
                {eventData.committeeSize}
              </Chip>

              <Tooltip content={eventData.eventVenueAddress} delay={0} closeDelay={200}>
                <Chip size="lg" variant="bordered" startContent={<MapPinIcon className="h-6 w-6" />}>
                  <p className="w-36 cursor-default overflow-hidden text-ellipsis whitespace-nowrap">
                    {eventData.eventVenueAddress}
                  </p>
                </Chip>
              </Tooltip>

              <Chip size="lg" variant="bordered" startContent={<CalendarDaysIcon className="h-6 w-6" />}>
                {new Date(eventData.eventStartDate).toLocaleDateString("en-UK")}
              </Chip>

              <Chip size="lg" variant="bordered" startContent={<ClockIcon className="h-6 w-6" />}>
                {new Date(eventData.eventStartDate).toLocaleTimeString("en-UK", {
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

      {eventData ? (
        <Image
          alt={eventData.eventTitle}
          className="h-72 w-full rounded-xl object-cover "
          src={eventData.s3Key}
          height={1600}
          width={900}
        />
      ) : (
        <Skeleton className="h-72 w-full rounded-xl" />
      )}

      {eventData ? (
        <p>{eventData.eventDescription}</p>
      ) : (
        <div className="space-y-2 py-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {eventData && (
        <div>
          <h3 className="text-xl">Sponsorship packets:</h3>

          <div className="mt-6 grid grid-cols-3 gap-6">
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
              eventData={eventData}
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
              eventData={eventData}
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
              eventData={eventData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
