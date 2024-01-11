import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { Event } from "#/entities";
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ConditionalLoading } from "#/types";

export function Event(props: ConditionalLoading<Event>) {
  const { isLoading } = props;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-3 py-6 text-start">
        {isLoading ? (
          <Skeleton className="h-5 w-11/12 rounded-lg" />
        ) : (
          <p className="text-default-500 line-clamp-1 text-sm">{props.eventDescription}</p>
        )}

        {isLoading ? (
          <Skeleton className="h-7 w-10/12 rounded-lg" />
        ) : (
          <h4 className="line-clamp-1 text-lg font-medium">{props.eventTitle}</h4>
        )}
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Skeleton className="aspect-video w-full rounded-xl" />
        ) : (
          <Image
            alt={props.eventTitle}
            className="h-auto w-full rounded-xl object-cover"
            src={props.s3Key}
            height={800}
            width={450}
          />
        )}
      </CardBody>
      <CardFooter className="flex flex-col gap-3">
        <div className="text-default-700 mr-auto flex flex-col justify-start gap-3 py-6 text-sm [&>div]:flex [&>div]:items-center [&>div]:gap-x-1.5 [&_svg]:h-6 [&_svg]:w-6">
          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded-lg" />
          ) : (
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
          )}

          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded-lg" />
          ) : (
            <div>
              <ClockIcon />
              <p>
                {new Date(props.eventStartDate).toLocaleTimeString("en-UK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded-lg" />
          ) : (
            <div>
              <MapPinIcon />
              <p>{props.eventVenueAddress}</p>
            </div>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="ml-auto h-10 w-40 rounded-lg" />
        ) : (
          <Button color="danger" variant="light" className="ml-auto">
            Read more
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
