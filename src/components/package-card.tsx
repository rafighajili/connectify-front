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
import { EventType } from "#/entities";

export function PackageCard(props: {
  type: "bronze" | "silver" | "gold" | "diamond";
  features: string[];
  price: number;
  event: EventType;
}) {
  const { type, features, price, event } = props;

  const typeHelper = {
    bronze: {
      bg: "bg-amber-600 dark:bg-amber-800",
      text: "text-amber-800 dark:text-amber-600",
    },
    silver: {
      bg: "bg-neutral-300 dark:bg-neutral-500",
      text: "text-neutral-500 dark:text-neutral-300",
    },
    gold: {
      bg: "bg-amber-400 dark:bg-amber-500",
      text: "text-amber-500 dark:text-amber-400",
    },
    diamond: {
      bg: "bg-teal-400 dark:bg-teal-500",
      text: "text-teal-500 dark:text-teal-400",
    },
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card>
        <CardHeader className="py-12">
          <h4 className={twMerge("flex-1 text-center text-2xl font-medium", typeHelper[type].text)}>
            {capitalize(type)} Sponsorship Package
          </h4>
        </CardHeader>

        <CardBody>
          <ul className="flex list-disc flex-col gap-1.5 pl-9">
            {features.map((feature, key) => (
              <li key={key} className="">
                {feature}
              </li>
            ))}
          </ul>
        </CardBody>

        <CardFooter className="flex-col items-stretch gap-3 pt-12">
          <p className="text-center text-4xl font-bold tracking-wider">{price} ₼</p>
          <Button size="lg" className={twMerge("h-24 text-xl", typeHelper[type].bg)} onPress={onOpen}>
            Unlock Benefits
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex-col gap-3">
                <p className="text-xl">Requested Event: {event.name}</p>
                <p className="text-xl">
                  Requested Package:{" "}
                  <span className={twMerge("whitespace-nowrap", typeHelper[type].text)}>
                    {capitalize(type)} Sponsorship Package
                  </span>
                </p>
              </ModalHeader>

              <ModalBody>
                <Textarea label="Write down your special request" />
              </ModalBody>

              <ModalFooter>
                <Button size="lg" type="submit" className={typeHelper[type].bg}>
                  Send your request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
