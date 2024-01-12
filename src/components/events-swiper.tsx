import { Swiper, SwiperSlide } from "swiper/react";
import useMounted from "#/utils";
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
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
import { Event } from "#/entities";

export function EventsSwiper({ isLoading, events }: ConditionalLoading<{ events: Event[] }>) {
  const mounted = useMounted();
  const swiperRef: any = useRef();

  return (
    <div className="overflow-x-clip overflow-y-visible">
      {mounted && !isLoading ? (
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1280: { slidesPerView: 4 } }}
            spaceBetween={24}
            centeredSlides
            loop
            className="!overflow-x-clip !overflow-y-visible"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <Event {...event} />
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
              <ArrowLongLeftIcon />
            </Button>
            <Button
              variant="bordered"
              color="primary"
              size="lg"
              radius="full"
              className="w-24 rotate-45 bg-white dark:bg-black"
              onPress={() => swiperRef.current.slideNext()}
            >
              <ArrowLongRightIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:translate-x-[calc(25%+6px)] sm:grid-cols-2 xl:translate-x-[calc(12.5%+3px)] xl:grid-cols-4 [&>div:nth-child(2)]:max-sm:hidden [&>div:nth-child(3)]:max-xl:hidden [&>div:nth-child(4)]:max-xl:hidden">
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

function Event(props: ConditionalLoading<Event>) {
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
            className="aspect-video h-auto w-full rounded-xl object-cover"
            src={props.s3Key}
            height={800}
            width={450}
          />
        )}
      </CardBody>
      <CardFooter>
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
