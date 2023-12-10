import { office } from "#/assets/images";
import { Event } from "#/entities";
import { Card, Divider, Tag, Tags } from "#/lib";
import { ConnectifyCheckIcon } from "#/lib/icons";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function Event(props: Event) {
  return (
    <Card className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 xl:gap-x-16">
      <Image src={office} alt={props.eventTitle} className="h-auto w-full" />

      <div className="p-8">
        <div
          className={twMerge(
            "w-fit rounded-full",
            props.eventStatus === "APPROVED" ? "bg-success-500" : "bg-warning-500",
          )}
        >
          <p className="px-8 py-2">{props.eventStatus}</p>
        </div>

        <h2 className="my-2 text-4xl font-medium">{props.eventTitle}</h2>

        <p className="text-sm text-default-500">{props.eventDescription}</p>
      </div>
    </Card>
  );
}
