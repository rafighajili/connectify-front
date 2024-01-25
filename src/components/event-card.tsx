import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ScrollShadow,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { ConditionalLoading, StyleProps } from "#/types";
import Image from "next/image";
import { ArrowLongRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { EventCompactType } from "#/schemas";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import { StatusType } from "#/entities";
import { StatusChip } from "#/components/status-chip";

export function EventCard(
  props: ConditionalLoading<{ eventData: EventCompactType } & Partial<StatusType>> &
    Partial<Record<"headerContent" | "footerContent", ReactNode>> & { hideStatus?: boolean } & StyleProps,
) {
  const {
    isLoading,
    eventData,
    status = eventData?.status,
    hideStatus = false,
    headerContent,
    footerContent,
    className,
    style,
  } = props;

  return (
    <Card className={className} style={style}>
      {headerContent && <CardHeader className="block w-full p-6 pb-0">{headerContent}</CardHeader>}

      <CardBody className="flex flex-col gap-6 p-6 lg:flex-row">
        {isLoading ? (
          <Skeleton className="aspect-square h-auto w-full rounded-xl sm:aspect-video lg:aspect-[4/3] lg:h-[312px] lg:w-auto" />
        ) : (
          <Image
            alt={eventData.name}
            className="aspect-square h-auto w-full rounded-xl object-cover sm:aspect-video lg:aspect-[4/3] lg:h-[312px] lg:w-auto"
            src={eventData.imageUrl}
            height={800}
            width={450}
            priority
          />
        )}

        <div className="h-fit flex-1 space-y-3">
          <div className="flex gap-3 max-sm:flex-col-reverse max-sm:items-start sm:justify-between">
            {isLoading ? (
              <Skeleton className="h-7 w-48 rounded-full" />
            ) : (
              <Chip color="primary" variant="faded">
                {eventData.type.name}
              </Chip>
            )}

            {!hideStatus &&
              (isLoading ? <Skeleton className="h-7 w-24 rounded-full" /> : status && <StatusChip status={status} />)}
          </div>

          <ScrollShadow
            hideScrollBar
            orientation="horizontal"
            className="flex w-[240px] gap-3 sm:w-[480px] lg:w-[360px]"
          >
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, key) => <Skeleton key={key} className="h-7 flex-1 rounded-full" />)
              : eventData.categories.map((category) => (
                  <Chip key={category.id} color="secondary" variant="flat">
                    {category.name}
                  </Chip>
                ))}
          </ScrollShadow>

          <div className="flex gap-3 text-sm text-default-500 max-sm:flex-col max-sm:items-start [&>div]:flex [&>div]:items-center [&>div]:gap-x-1.5 [&_svg]:h-6 [&_svg]:w-6">
            {isLoading ? (
              <Skeleton className="h-6 w-16 rounded-lg" />
            ) : (
              <div>
                <UsersIcon />
                <p>{eventData.size}</p>
              </div>
            )}

            {isLoading ? (
              <Skeleton className="h-6 w-48 rounded-lg" />
            ) : (
              <Tooltip content={eventData.venue} delay={0} closeDelay={200}>
                <div>
                  <MapPinIcon />
                  <p className="max-w-[120px] cursor-default overflow-hidden text-ellipsis whitespace-nowrap">
                    {eventData.venue}
                  </p>
                </div>
              </Tooltip>
            )}

            {isLoading ? (
              <Skeleton className="h-6 w-32 rounded-lg" />
            ) : (
              <div>
                <CalendarDaysIcon />
                <p className="cursor-default">{new Date(eventData.date).toLocaleDateString("en-UK")}</p>
              </div>
            )}

            {isLoading ? (
              <Skeleton className="h-6 w-16 rounded-lg" />
            ) : (
              <div>
                <ClockIcon />
                <p>
                  {new Date(eventData.date).toLocaleTimeString("en-UK", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 py-3">
            {isLoading ? (
              <Skeleton className="h-8 w-3/4 rounded-lg" />
            ) : (
              <h3 className="line-clamp-1 text-2xl font-medium">{eventData.name}</h3>
            )}

            {isLoading ? (
              <div className="space-y-2 py-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <p className="line-clamp-3 h-[72px] text-default-500">{eventData.description}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            {isLoading ? (
              <Skeleton className="h-5 w-24 rounded-lg" />
            ) : (
              <p className="text-sm text-default-500">
                {formatDistanceToNow(new Date(eventData.createdAt), { addSuffix: true })}
              </p>
            )}

            {isLoading ? (
              <Skeleton className="h-10 w-32 rounded-lg" />
            ) : (
              <Button
                as={NextLink}
                variant="light"
                color="primary"
                href={`/event/${eventData.id}`}
                endContent={<ArrowLongRightIcon className="h-4 w-4" />}
              >
                Read more
              </Button>
            )}
          </div>
        </div>
      </CardBody>

      {footerContent && <CardFooter className="block w-full p-6 pt-0">{footerContent}</CardFooter>}
    </Card>
  );
}
