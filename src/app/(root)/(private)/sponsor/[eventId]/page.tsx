"use client";

import { useCreateSponsorshipMutation, useGetEventQuery } from "#/services";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { PackageType } from "#/entities";
import { twMerge } from "tailwind-merge";
import { packageClassNameHelper } from "#/utils";
import { Controller, useForm } from "react-hook-form";
import { createSponsorshipRequestSchema, CreateSponsorshipRequestType } from "#/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function EventPage({ params: { eventId } }: { params: { eventId: string } }) {
  const { data: eventData } = useGetEventQuery(eventId);

  return (
    <div className="space-y-12">
      {eventData ? (
        <h1 className="text-4xl font-medium">{eventData.name}</h1>
      ) : (
        <Skeleton className="h-10 rounded-lg" />
      )}

      <div className="flex gap-6 max-lg:flex-col lg:justify-between">
        {eventData ? (
          <Chip size="lg" color="primary" variant="faded">
            {eventData.type.name}
          </Chip>
        ) : (
          <Skeleton className="h-8 w-36 rounded-full" />
        )}

        <div className="flex gap-3 max-sm:flex-col">
          {eventData ? (
            <>
              <Chip size="lg" variant="bordered" startContent={<UsersIcon className="h-6 w-6" />}>
                {eventData.size}
              </Chip>

              <Tooltip content={eventData.venue} delay={0} closeDelay={200}>
                <Chip size="lg" variant="bordered" startContent={<MapPinIcon className="h-6 w-6" />}>
                  <p className="max-w-[144px] cursor-default overflow-hidden text-ellipsis whitespace-nowrap">
                    {eventData.venue}
                  </p>
                </Chip>
              </Tooltip>

              <Chip size="lg" variant="bordered" startContent={<CalendarDaysIcon className="h-6 w-6" />}>
                {new Date(eventData.date).toLocaleDateString("en-UK")}
              </Chip>

              <Chip size="lg" variant="bordered" startContent={<ClockIcon className="h-6 w-6" />}>
                {new Date(eventData.date).toLocaleTimeString("en-UK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Chip>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </>
          )}
        </div>
      </div>

      <div className="!mt-6 flex flex-wrap gap-6">
        {eventData ? (
          eventData.categories.map((category) => (
            <Chip key={category.id} color="secondary" variant="flat">
              {category.name}
            </Chip>
          ))
        ) : (
          <>
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </>
        )}
      </div>

      {eventData ? (
        <Image
          alt={eventData.name}
          className="h-72 w-full rounded-xl object-cover "
          src={eventData.imageUrl}
          height={1600}
          width={900}
        />
      ) : (
        <Skeleton className="h-72 w-full rounded-xl" />
      )}

      {eventData ? (
        <p>{eventData.description}</p>
      ) : (
        <div className="space-y-2 py-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {eventData && (
        <div className="space-y-6">
          <h3 className="text-xl">Sponsorship packages:</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {eventData.packages.map((packageData) => (
              <PackageCard key={packageData.id} packageData={packageData} />
            ))}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export function PackageCard(props: { packageData: PackageType }) {
  const { packageData } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [createSponsorship, { isLoading, isSuccess, isError }] = useCreateSponsorshipMutation();

  const { control, handleSubmit, reset } = useForm<CreateSponsorshipRequestType>({
    defaultValues: {
      eventPackageId: packageData.id,
      comments: "",
    },
    resolver: zodResolver(createSponsorshipRequestSchema),
  });

  useEffect(() => {
    reset();
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <>
      <Card>
        <CardHeader className="py-12">
          <h4
            className={twMerge(
              "flex-1 text-center text-2xl font-medium",
              packageClassNameHelper[packageData.name].text,
            )}
          >
            {packageData.name} <br />
            Sponsorship <br />
            Package
          </h4>
        </CardHeader>

        <CardBody>
          <ul className="flex list-disc flex-col gap-1.5 pl-9">
            {packageData.features.map((feature) => (
              <li key={feature.id} className="">
                {feature.name}
              </li>
            ))}
          </ul>
        </CardBody>

        <CardFooter className="flex-col items-stretch gap-3 pt-12">
          <p className="text-center text-4xl font-bold tracking-wider">{packageData.price} ₼</p>
          <Button
            size="lg"
            className={twMerge("h-24 text-xl", packageClassNameHelper[packageData.name].bg)}
            onPress={onOpen}
          >
            Unlock Benefits
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" placement="center">
        <ModalContent>
          <ModalHeader className="flex-col font-medium">
            <h3>
              Requested Package:{" "}
              <span className={twMerge("font-bold", packageClassNameHelper[packageData.name].text)}>
                {packageData.name}
              </span>
            </h3>

            {isSuccess && <p className="text-sm font-normal text-success-500">Your request was sent successfully!</p>}
            {isError && <p className="text-sm font-normal text-danger-500">You have already sent a sponsor request.</p>}
          </ModalHeader>

          <form onSubmit={handleSubmit(createSponsorship)}>
            <ModalBody>
              <Controller
                control={control}
                name="comments"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Textarea
                    label="Write down your special request"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                size="lg"
                type="submit"
                className={packageClassNameHelper[packageData.name].bg}
                isLoading={isLoading}
              >
                Send your request
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
