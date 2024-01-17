"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard, StatusChip } from "#/components";
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";

export default function SponsoredEventsPage() {
  const { data: eventsSponsored, isLoading: isEventsLoading } = useGetEventsSponsoredQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My Sponsored Events</h1>

      <div className="space-y-6">
        {isEventsLoading || !eventsSponsored
          ? Array(3)
              .fill(0)
              .map((_, key) => (
                <EventCard
                  key={key}
                  isLoading
                  className="border-2 border-default-300"
                  endContent={<Skeleton className="h-7 w-24  rounded-full" />}
                  footerContent={
                    <div className="w-full space-y-1.5">
                      <Skeleton className="h-5 w-72 rounded-lg" />
                      <Skeleton className="h-7 w-72 rounded-lg" />
                      <Skeleton className="h-5" />
                    </div>
                  }
                />
              ))
          : eventsSponsored.map((eventSponsored) => (
              <EventCard
                key={eventSponsored.id}
                eventData={eventSponsored.eventPackage.event}
                endContent={<StatusChip status={eventSponsored.status} />}
                footerContent={
                  eventSponsored.comments && (
                    <div className="space-y-1.5">
                      <p
                        className={twMerge(
                          "text-sm font-medium",
                          packageClassNameHelper[eventSponsored.eventPackage.name].text,
                        )}
                      >
                        Sponsored to <span className="font-bold">{eventSponsored.eventPackage.name}</span> Package
                      </p>
                      <h4 className="text-xl font-medium">Your special request:</h4>
                      <p className="text-sm text-default-500">{eventSponsored.comments}</p>
                    </div>
                  )
                }
                className={twMerge(
                  "border-2 !bg-opacity-20",
                  packageClassNameHelper[eventSponsored.eventPackage.name].border,
                  packageClassNameHelper[eventSponsored.eventPackage.name].bg,
                )}
              />
            ))}
      </div>
    </div>
  );
}
