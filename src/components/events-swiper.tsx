import { Swiper, SwiperSlide } from "swiper/react";
import { useMounted } from "#/utils";
import { Button, Card, CardFooter, CardHeader, Chip, Skeleton } from "@nextui-org/react";
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
import { EventCompactType } from "#/schemas";

export function EventsSwiper({ isLoading, events }: ConditionalLoading<{ events: EventCompactType[] }>) {
  const mounted = useMounted();
  const swiperRef: any = useRef();

  return (
    <div className="overflow-x-clip overflow-y-visible">
      {mounted && !isLoading ? (
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            spaceBetween={-24}
            breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }}
            centeredSlides
            loop
            className="!overflow-x-clip !overflow-y-visible"
          >
            {events.map((eventData) => (
              <SwiperSlide key={eventData.id} className="max-sm:px-6">
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
    <Card isFooterBlurred>
      <CardHeader className="flex flex-col items-start gap-3 px-3 py-6 text-start">
        {isLoading ? (
          <Skeleton className="h-5 w-11/12 rounded-lg" />
        ) : (
          <p className="line-clamp-1 text-sm text-default-500">{props.description}</p>
        )}
        {isLoading ? (
          <Skeleton className="h-7 w-10/12 rounded-lg" />
        ) : (
          <h3 className="line-clamp-1 text-lg font-medium">{props.name}</h3>
        )}
      </CardHeader>
      {isLoading ? (
        <Skeleton className="aspect-square w-full rounded-xl" />
      ) : (
        <Image
          alt={props.name}
          className="aspect-square h-auto w-full rounded-xl object-cover"
          src={props.imageUrl}
          height={800}
          width={450}
          priority
        />
      )}
      <CardFooter className="absolute bottom-0 z-10 flex flex-col items-stretch gap-1.5 border-t border-neutral-300/25 bg-white/25 p-3 dark:bg-black/25 [&_svg]:h-6 [&_svg]:w-6">
        <div className="flex justify-between">
          {isLoading ? (
            <Skeleton className="h-8 w-48 rounded-lg" />
          ) : (
            <Chip variant="light" size="lg" startContent={<CalendarDaysIcon />}>
              {new Date(props.date).toLocaleDateString("en-UK", {
                day: "numeric",
                weekday: "long",
                month: "long",
              })}
            </Chip>
          )}

          {isLoading ? (
            <Skeleton className="h-8 w-24 rounded-lg" />
          ) : (
            <Chip variant="light" size="lg" startContent={<ClockIcon />}>
              {new Date(props.date).toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Chip>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-8 w-full rounded-lg" />
        ) : (
          <Chip variant="light" size="lg" startContent={<MapPinIcon />}>
            {props.venue}
          </Chip>
        )}
      </CardFooter>
    </Card>
  );
}
