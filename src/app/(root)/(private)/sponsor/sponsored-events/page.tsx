"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard, StatusChip } from "#/components";
import { Button, Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";
import NextLink from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

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
                topEndContent={<StatusChip status={eventSponsored.status} />}
                bottomEndContent={
                  <Button
                    as={NextLink}
                    variant="light"
                    color="primary"
                    href={`/sponsor/${eventSponsored.eventPackage.event.id}`}
                    endContent={<ArrowLongRightIcon className="h-4 w-4" />}
                  >
                    Go to this event
                  </Button>
                }
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
