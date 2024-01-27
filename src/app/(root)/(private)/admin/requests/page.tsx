"use client";

import { useApproveSponsorshipMutation, useGetSponsorshipsQuery, useRejectSponsorshipMutation } from "#/services";
import { EventCard, MyPagination } from "#/components";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper, useCurrentPage } from "#/utils";
import { Button, User } from "@nextui-org/react";
import { SponsorshipType } from "#/schemas";
import { formatDistanceToNow } from "date-fns";

export default function AdminRequestsPage() {
  const { data, isFetching } = useGetSponsorshipsQuery({ page: useCurrentPage() });

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Requests</h1>

      <div className="space-y-6">
        {!data || isFetching
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading className="border-2 border-default-300" />)
          : data.data.map((sponsorshipData) => (
              <MySponsorship key={sponsorshipData.id} sponsorshipData={sponsorshipData} />
            ))}
      </div>

      {data && <MyPagination meta={data.meta} />}
    </div>
  );
}

function MySponsorship({ sponsorshipData }: { sponsorshipData: SponsorshipType }) {
  const [rejectSponsorship, { isLoading: isRejectLoading }] = useRejectSponsorshipMutation();
  const [approveSponsorship, { isLoading: isApproveLoading }] = useApproveSponsorshipMutation();

  return (
    <EventCard
      key={sponsorshipData.id}
      eventData={sponsorshipData.eventPackage.event}
      status={sponsorshipData.status}
      className={twMerge(
        "border-2 !bg-opacity-20",
        packageClassNameHelper[sponsorshipData.eventPackage.name].border,
        packageClassNameHelper[sponsorshipData.eventPackage.name].bg,
      )}
      headerContent={
        <div className="space-y-3">
          <User
            className="max-sm:self-start"
            name={`${sponsorshipData.sponsor.firstName} ${sponsorshipData.sponsor.lastName}`}
            description={`${sponsorshipData.sponsor.role} / ${sponsorshipData.sponsor.email} / ${sponsorshipData.sponsor.phoneNumber}`}
            avatarProps={{
              name: `${
                sponsorshipData.sponsor.firstName.charAt(0) + sponsorshipData.sponsor.lastName.charAt(0)
              }`.toUpperCase(),
              classNames: { base: "min-w-[40px]", name: "text-sm" },
            }}
          />

          <div className="space-y-1.5">
            <p
              className={twMerge("text-sm font-medium", packageClassNameHelper[sponsorshipData.eventPackage.name].text)}
            >
              <span>Sponsored to </span>
              <span className="font-bold">{sponsorshipData.eventPackage.name}</span>
              <span> Package </span>
              <span className="text-xs font-normal text-default-500">
                {formatDistanceToNow(new Date(sponsorshipData.createdAt), { addSuffix: true })}
              </span>
            </p>

            <h4 className="text-xl font-medium">Sponsor&apos;s special request:</h4>
            <p className="text-sm text-default-500">{sponsorshipData.comments}</p>
          </div>
        </div>
      }
      footerContent={
        <div className="flex gap-6 max-sm:flex-col sm:items-center sm:justify-between">
          {sponsorshipData.eventPackage.event?.organizer && (
            <User
              className="max-sm:self-start"
              name={`${sponsorshipData.eventPackage.event.organizer.firstName} ${sponsorshipData.eventPackage.event.organizer.lastName}`}
              description={`${sponsorshipData.eventPackage.event.organizer.role} / ${sponsorshipData.eventPackage.event.organizer.email} / ${sponsorshipData.eventPackage.event.organizer.phoneNumber}`}
              avatarProps={{
                name: `${
                  sponsorshipData.eventPackage.event.organizer.firstName.charAt(0) +
                  sponsorshipData.eventPackage.event.organizer.lastName.charAt(0)
                }`.toUpperCase(),
                classNames: { base: "min-w-[40px]", name: "text-sm" },
              }}
            />
          )}

          <div className="flex gap-3 max-sm:self-end">
            <Button
              variant="ghost"
              color="danger"
              isLoading={isRejectLoading}
              onPress={() => rejectSponsorship(sponsorshipData.id)}
            >
              Reject
            </Button>
            <Button
              variant="ghost"
              color="success"
              isLoading={isApproveLoading}
              onPress={() => approveSponsorship(sponsorshipData.id)}
            >
              Approve
            </Button>
          </div>
        </div>
      }
    />
  );
}
