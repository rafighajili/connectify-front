"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard } from "#/components";
import { Chip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";

export default function SponsoredEventsPage() {
  const { data: eventsSponsored, isLoading: isEventsLoading } = useGetEventsSponsoredQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My Sponsored Events</h1>

      <div className="space-y-6">
        {isEventsLoading || !eventsSponsored ? (
          <>
            <EventCard isLoading />
            <EventCard isLoading />
            <EventCard isLoading />
          </>
        ) : (
          eventsSponsored.map((eventSponsored) => (
            <EventCard
              key={eventSponsored.id}
              eventData={eventSponsored.eventPackage.event}
              endContent={
                <Chip
                  variant="flat"
                  color={
                    eventSponsored.status === "APPROVED"
                      ? "success"
                      : eventSponsored.status === "REJECTED"
                      ? "danger"
                      : eventSponsored.status === "PENDING"
                      ? "warning"
                      : undefined
                  }
                >
                  {eventSponsored.status}
                </Chip>
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
          ))
        )}
      </div>
    </div>
  );
}