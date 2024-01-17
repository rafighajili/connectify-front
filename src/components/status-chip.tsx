import { StatusType } from "#/entities";
import { Chip } from "@nextui-org/react";

export function StatusChip({ status }: StatusType) {
  return (
    <Chip
      variant="flat"
      color={
        status === "APPROVED"
          ? "success"
          : status === "REJECTED"
          ? "danger"
          : status === "PENDING"
          ? "warning"
          : undefined
      }
    >
      {status}
    </Chip>
  );
}
