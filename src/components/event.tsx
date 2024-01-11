import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { Event } from "#/entities";
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export function Event(props: Event) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-3 py-6 text-start">
        <p className="text-default-500 line-clamp-1 text-sm">{props.eventDescription}</p>
        <h4 className="line-clamp-1 text-lg font-medium">{props.eventTitle}</h4>
      </CardHeader>
      <CardBody>
        <Image
          alt={props.eventTitle}
          className="h-auto w-full rounded-xl object-cover"
          src={props.s3Key}
          height={800}
          width={450}
        />
      </CardBody>
      <CardFooter className="flex flex-col gap-3">
        <div className="text-default-700 mr-auto flex flex-col justify-start gap-3 py-6 text-sm [&>div]:flex [&>div]:items-center [&>div]:gap-x-1.5 [&_svg]:h-6 [&_svg]:w-6">
          <div>
            <CalendarDaysIcon />
            <p>
              {new Date(props.eventStartDate).toLocaleDateString("en-UK", {
                day: "numeric",
                weekday: "long",
                month: "long",
              })}
            </p>
          </div>
          <div>
            <ClockIcon />
            <p>
              {new Date(props.eventStartDate).toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <MapPinIcon />
            <p>{props.eventVenueAddress}</p>
          </div>
        </div>

        <Button color="danger" variant="light" className="ml-auto">
          Read more
        </Button>
      </CardFooter>
    </Card>
  );
}
