import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { capitalize } from "@nextui-org/shared-utils";
import { EventType, PackageType } from "#/entities";

export const packageClassNameHelper = {
  BRONZE: {
    bg: "bg-amber-600 dark:bg-amber-800",
    border: "border-amber-600 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-600",
  },
  SILVER: {
    bg: "bg-neutral-300 dark:bg-neutral-500",
    border: "border-neutral-300 dark:border-neutral-500",
    text: "text-neutral-500 dark:text-neutral-300",
  },
  GOLD: {
    bg: "bg-amber-400 dark:bg-amber-500",
    border: "border-amber-400 dark:border-amber-500",
    text: "text-amber-500 dark:text-amber-400",
  },
  DIAMOND: {
    bg: "bg-teal-400 dark:bg-teal-500",
    border: "border-teal-400 dark:border-teal-500",
    text: "text-teal-500 dark:text-teal-400",
  },
};

export function PackageCard(props: { packageData: PackageType; eventData: EventType }) {
  const { packageData, eventData } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            {capitalize(packageData.name)} Sponsorship Package
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
          <ModalHeader className="flex-col gap-3">
            <p className="text-xl">Requested Event: {eventData.name}</p>
            <p className="text-xl">
              Requested Package:{" "}
              <span className={twMerge("whitespace-nowrap", packageClassNameHelper[packageData.name].text)}>
                {capitalize(packageData.name)} Sponsorship Package
              </span>
            </p>
          </ModalHeader>

          <ModalBody>
            <Textarea label="Write down your special request" />
          </ModalBody>

          <ModalFooter>
            <Button size="lg" type="submit" className={packageClassNameHelper[packageData.name].bg}>
              Send your request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
