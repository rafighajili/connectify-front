import { createSlots } from "../utils";
import { ConnectifyTabsProps } from "./tab.props";

export const [TabsSlotsProvider, useTabsSlots] =
  createSlots<Required<Pick<ConnectifyTabsProps, "color" | "size" | "radius">>>();
