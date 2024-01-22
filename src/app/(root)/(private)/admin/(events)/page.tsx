"use client";

import { useApproveEventMutation, useGetEventsAdminQuery, useRejectEventMutation } from "#/services";
import { EventCard, StatusChip } from "#/components";
import { Button } from "@nextui-org/react";
import { EventType } from "#/entities";

export default function AdminEventsPage() {
  const { data: events, isLoading: isEventsLoading } = useGetEventsAdminQuery({});

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-medium">Events</h1>

      <div className="space-y-6">
        {isEventsLoading || !events
          ? Array(3)
              .fill(0)
              .map((_, key) => <EventCard key={key} isLoading />)
          : events.map((eventData) => <MyEvent key={eventData.id} eventData={eventData} />)}
      </div>
    </div>
  );
}

function MyEvent({ eventData }: { eventData: EventType }) {
  const [approveEvent, { isLoading: isApproveLoading }] = useApproveEventMutation();
  const [rejectEvent, { isLoading: isRejectLoading }] = useRejectEventMutation();

  return (
    <EventCard
      key={eventData.id}
      eventData={eventData}
      bottomEndContent={<StatusChip status={eventData.status} />}
      footerContent={
        <div className="flex w-full justify-end gap-3">
          <Button variant="ghost" color="danger" isLoading={isRejectLoading} onPress={() => rejectEvent(eventData.id)}>
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
      }
    />
  );
}
