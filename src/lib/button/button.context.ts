import { createSlots } from "../utils";
import { ConnectifyButtonGroupProps } from "./button.props";

export const [ButtonGroupSlotsProvider, useButtonGroupSlots] = createSlots<
  Omit<ConnectifyButtonGroupProps, "children" | "className" | "style"> & { isInGroup?: boolean }
>();
