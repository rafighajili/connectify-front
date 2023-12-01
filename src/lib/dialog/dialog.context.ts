import { createSlots } from "../utils";
import { OverlayTriggerState } from "react-stately";
import { RefObject } from "react";

export const [DialogSlotsProvider, useDialogSlots] = createSlots<{
  state: OverlayTriggerState;
  triggerRef: RefObject<HTMLElement>;
}>();
