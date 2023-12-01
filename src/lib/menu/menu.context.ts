import { createSlots } from "../utils";
import { MenuTriggerState } from "react-stately";
import { RefObject } from "react";

export const [MenuSlotsProvider, useMenuSlots] = createSlots<{
  state: MenuTriggerState;
  triggerRef: RefObject<HTMLElement>;
}>();
