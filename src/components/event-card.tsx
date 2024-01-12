import { Button, Card, CardBody, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { ConditionalLoading } from "#/types";
import Image from "next/image";
import { Event } from "#/entities";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

export function EventCard(props: ConditionalLoading<Event>) {
  const { isLoading } = props;

  return (
    <Card className="p-1.5">
      <CardBody className="flex flex-col gap-x-12 gap-y-6 md:flex-row">
        {isLoading ? (
          <Skeleton className="aspect-video h-auto w-full rounded-xl md:aspect-square md:h-[356px] md:w-auto lg:h-[248px]" />
        ) : (
          <Image
            alt={props.eventTitle}
            className="aspect-video h-auto w-full rounded-xl object-cover md:aspect-square md:h-[356px] md:w-auto lg:h-[248px]"
            src={props.s3Key}
            height={800}
            width={450}
          />
        )}

        <div className="flex-1 space-y-6">
          <div className="flex gap-3 max-lg:flex-col lg:items-center lg:justify-between">
            {isLoading ? (
              <Skeleton className="h-8 w-36 rounded-full" />
            ) : (
              <Chip size="lg" color="primary" variant="flat">
                {props.eventType}
              </Chip>
            )}

            <div className="text-default-500 flex gap-3 text-sm max-lg:flex-col max-lg:items-start [&>div]:flex [&>div]:items-center [&>div]:gap-x-1.5 [&_svg]:h-6 [&_svg]:w-6">
              {isLoading ? (
                <Skeleton className="h-6 w-24 rounded-lg" />
              ) : (
                <div>
                  <UsersIcon />
                  <p>{props.committeeSize}</p>
                </div>
              )}

              {isLoading ? (
                <Skeleton className="h-6 w-24 rounded-lg" />
              ) : (
                <Tooltip content={props.eventVenueAddress} delay={0} closeDelay={200}>
                  <div>
                    <MapPinIcon />
                    <p className="w-36 cursor-default overflow-hidden text-ellipsis whitespace-nowrap">
                      {props.eventVenueAddress}
                    </p>
                  </div>
                </Tooltip>
              )}

              {isLoading ? (
                <Skeleton className="h-6 w-24 rounded-lg" />
              ) : (
                <Tooltip
                  content={
                    <div className="flex items-center gap-x-1.5 [&>svg]:h-6 [&>svg]:w-6">
                      <ClockIcon />
                      <p>
                        {new Date(props.eventStartDate).toLocaleTimeString("en-UK", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  }
                  delay={0}
                  closeDelay={200}
                >
                  <div>
                    <CalendarDaysIcon />
                    <p className="w-24 cursor-default">{new Date(props.eventStartDate).toLocaleDateString("en-UK")}</p>
                  </div>
                </Tooltip>
              )}
            </div>
          </div>

          {isLoading ? (
            <Skeleton className="h-8 w-3/4 rounded-lg" />
          ) : (
            <h3 className="line-clamp-1 text-2xl font-medium">{props.eventTitle}</h3>
          )}

          {isLoading ? (
            <div className="space-y-2 py-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <p className="text-default-500 line-clamp-3 h-[72px]">{props.eventDescription}</p>
          )}

          <div className="flex items-center justify-between">
            {isLoading ? (
              <Skeleton className="h-5 w-24 rounded-lg" />
            ) : (
              <p className="text-default-500 text-sm">4 days ago</p>
            )}

            {isLoading ? (
              <Skeleton className="h-10 w-36 rounded-lg" />
            ) : (
              <Button color="danger" variant="light">
                Read more
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
