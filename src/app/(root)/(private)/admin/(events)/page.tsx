"use client";

import { useApproveEventMutation, useGetEventsAdminQuery, useRejectEventMutation } from "#/services";
import { EventCard } from "#/components";
import { Button, User } from "@nextui-org/react";
import { EventType } from "#/entities";

export default function AdminEventsPage() {
  const { data, isLoading } = useGetEventsAdminQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Events</h1>

      <div className="space-y-6">
        {isLoading || !data
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading />)
          : data.data.map((eventData) => <MyEvent key={eventData.id} eventData={eventData} />)}
      </div>
    </div>
  );
}

function MyEvent({ eventData }: { eventData: EventType }) {
  const [rejectEvent, { isLoading: isRejectLoading }] = useRejectEventMutation();
  const [approveEvent, { isLoading: isApproveLoading }] = useApproveEventMutation();

  return (
    <EventCard
      key={eventData.id}
      eventData={eventData}
      footerContent={
        <div className="flex gap-6 max-sm:flex-col sm:items-center sm:justify-between">
          {eventData?.organizer && (
            <User
              className="max-sm:self-start"
              name={`${eventData.organizer.firstName} ${eventData.organizer.lastName}`}
              description={`${eventData.organizer.role} / ${eventData.organizer.email} / ${eventData.organizer.phoneNumber}`}
              avatarProps={{
                name: `${
                  eventData.organizer.firstName.charAt(0) + eventData.organizer.lastName.charAt(0)
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
              onPress={() => rejectEvent(eventData.id)}
            >
              Reject
            </Button>
            <Button
              variant="ghost"
              color="success"
              isLoading={isApproveLoading}
              onPress={() => approveEvent(eventData.id)}
            >
              Approve
            </Button>
          </div>
        </div>
      }
    />
  );
}
