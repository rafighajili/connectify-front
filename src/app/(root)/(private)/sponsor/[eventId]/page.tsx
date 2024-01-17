"use client";

import { useGetEventQuery } from "#/services";
import { Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function EventPage({ params: { eventId } }: { params: { eventId: string } }) {
  const { data: eventData } = useGetEventQuery(eventId);

  return (
    <div className="space-y-12">
      {eventData ? (
        <h1 className="text-4xl font-medium">{eventData.name}</h1>
      ) : (
        <Skeleton className="h-10 rounded-lg" />
      )}

      <div className="flex gap-6 max-lg:flex-col lg:justify-between">
        {eventData ? (
          <Chip size="lg" color="primary" variant="flat">
            {eventData.type.name}
          </Chip>
        ) : (
          <Skeleton className="h-8 w-36 rounded-full" />
        )}

        <div className="flex gap-3 max-sm:flex-col">
          {eventData ? (
            <>
              <Chip size="lg" variant="bordered" startContent={<UsersIcon className="h-6 w-6" />}>
                {eventData.size}
              </Chip>

              <Tooltip content={eventData.venue} delay={0} closeDelay={200}>
                <Chip size="lg" variant="bordered" startContent={<MapPinIcon className="h-6 w-6" />}>
                  <p className="w-36 cursor-default overflow-hidden text-ellipsis whitespace-nowrap">
                    {eventData.venue}
                  </p>
                </Chip>
              </Tooltip>

              <Chip size="lg" variant="bordered" startContent={<CalendarDaysIcon className="h-6 w-6" />}>
                {new Date(eventData.date).toLocaleDateString("en-UK")}
              </Chip>

              <Chip size="lg" variant="bordered" startContent={<ClockIcon className="h-6 w-6" />}>
                {new Date(eventData.date).toLocaleTimeString("en-UK", {
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
          alt={eventData.name}
          className="h-72 w-full rounded-xl object-cover "
          src={eventData.imageUrl}
          height={1600}
          width={900}
        />
      ) : (
        <Skeleton className="h-72 w-full rounded-xl" />
      )}

      {eventData ? (
        <p>{eventData.description}</p>
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
        </div>
      )}
    </div>
  );
}
