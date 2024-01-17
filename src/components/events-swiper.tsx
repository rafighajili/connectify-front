import { Swiper, SwiperSlide } from "swiper/react";
import { useMounted } from "#/utils";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, Tooltip } from "@nextui-org/react";
import { useRef } from "react";
import { ConditionalLoading } from "#/types";
import Image from "next/image";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { EventCompactType } from "#/schemas";

export function EventsSwiper({ isLoading, events }: ConditionalLoading<{ events: EventCompactType[] }>) {
  const mounted = useMounted();
  const swiperRef: any = useRef();

  return (
    <div className="overflow-x-clip overflow-y-visible">
      {mounted && !isLoading ? (
        <div className="relative max-sm:px-6">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1280: { slidesPerView: 4 } }}
            spaceBetween={24}
            centeredSlides
            loop
            className="!overflow-x-clip !overflow-y-visible"
          >
            {events.map((eventData) => (
              <SwiperSlide key={eventData.id}>
                <Event {...eventData} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute -inset-x-9 top-1/2 z-10 flex -translate-y-1/2 justify-between">
            <Button
              variant="bordered"
              size="lg"
              radius="full"
              className="w-24 -rotate-45 border-black bg-white dark:border-white dark:bg-black"
              onPress={() => swiperRef.current.slidePrev()}
            >
              <ArrowLongLeftIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="bordered"
              color="primary"
              size="lg"
              radius="full"
              className="w-24 rotate-45 bg-white dark:bg-black"
              onPress={() => swiperRef.current.slideNext()}
            >
              <ArrowLongRightIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-sm:px-6 sm:translate-x-[calc(25%+6px)] sm:grid-cols-2 xl:translate-x-[calc(12.5%+3px)] xl:grid-cols-4 [&>div:nth-child(2)]:max-sm:hidden [&>div:nth-child(3)]:max-xl:hidden [&>div:nth-child(4)]:max-xl:hidden">
          <div className="relative">
            <Event isLoading />
            <div className="absolute inset-0 z-10 -translate-x-[calc(100%+24px)] max-sm:hidden">
              <Event isLoading />
            </div>
          </div>
          <Event isLoading />
          <Event isLoading />
          <Event isLoading />
        </div>
      )}
    </div>
  );
}

function Event(props: ConditionalLoading<EventCompactType>) {
  const { isLoading } = props;

  return (
    <Card
      classNames={{
        header: "flex flex-col items-start gap-3 py-6 text-start",
        footer: "flex flex-col gap-3",
      }}
    >
      <CardHeader>
        {isLoading ? (
          <Skeleton className="h-7 w-10/12 rounded-lg" />
        ) : (
          <h3 className="line-clamp-1 text-lg font-medium">{props.name}</h3>
        )}

        {isLoading ? (
          <Skeleton className="h-5 w-11/12 rounded-lg" />
        ) : (
          <p className="line-clamp-1 text-sm text-default-500">{props.description}</p>
        )}
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Skeleton className="aspect-video w-full rounded-xl" />
        ) : (
          <Image
            alt={props.name}
            className="aspect-video h-auto w-full rounded-xl object-cover"
            src={props.imageUrl}
            height={800}
            width={450}
          />
        )}
      </CardBody>
      <CardFooter>
        <div className="mr-auto flex flex-col justify-start gap-3 py-6 text-sm text-default-700 [&>div]:flex [&>div]:items-center [&>div]:gap-x-1.5 [&_svg]:h-6 [&_svg]:w-6">
          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded-lg" />
          ) : (
            <div>
              <CalendarDaysIcon />
              <p>
                {new Date(props.date).toLocaleDateString("en-UK", {
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
                {new Date(props.date).toLocaleTimeString("en-UK", {
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
              <p>{props.venue}</p>
            </div>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="ml-auto h-10 w-40 rounded-lg" />
        ) : (
          <Tooltip content="Login as a sponsor to see this event" delay={0} closeDelay={200}>
            <Button
              as={NextLink}
              href="/login"
              color="danger"
              variant="light"
              className="ml-auto"
              endContent={<ArrowLongRightIcon className="h-4 w-4" />}
            >
              Read more
            </Button>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
}
