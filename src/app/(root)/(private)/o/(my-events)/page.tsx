import { Button } from "@nextui-org/react";
import NextLink from "next/link";

export default function Page() {
  return (
    <div className="container">
      <div className="flex flex-wrap items-center justify-between gap-x-36 gap-y-6">
        <h1 className="text-4xl font-medium">My events</h1>
        <Button variant="flat" radius="full" color="primary" as={NextLink} href="/o/create-event">
          Create a new event
        </Button>
      </div>
    </div>
  );
}
