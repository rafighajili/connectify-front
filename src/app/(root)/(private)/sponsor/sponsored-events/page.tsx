"use client";

import { useGetEventsSponsoredQuery } from "#/services";
import { EventCard, MyPagination } from "#/components";
import { Skeleton } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper, useCurrentPage } from "#/utils";
import { formatDistanceToNow } from "date-fns";

export default function SponsoredEventsPage() {
  const { data, isFetching } = useGetEventsSponsoredQuery({ page: useCurrentPage() });

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">My Sponsored Events</h1>

      <div className="space-y-6">
        {!data || isFetching
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
          : data.data.map((eventSponsored) => (
              <EventCard
                key={eventSponsored.id}
                eventData={eventSponsored.eventPackage.event}
                status={eventSponsored.status}
                footerContent={
                  eventSponsored.comments && (
                    <div className="space-y-1.5">
                      <p
                        className={twMerge(
                          "text-sm font-medium",
                          packageClassNameHelper[eventSponsored.eventPackage.name].text,
                        )}
                      >
                        <span>Sponsored to </span>
                        <span className="font-bold">{eventSponsored.eventPackage.name}</span>
                        <span> Package </span>
                        <span className="text-xs font-normal text-default-500">
                          {formatDistanceToNow(new Date(eventSponsored.createdAt), { addSuffix: true })}
                        </span>
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

      {data && <MyPagination meta={data.meta} />}
    </div>
  );
}
