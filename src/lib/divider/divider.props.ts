import { SeparatorProps } from "react-aria";
import { Sizes, StyleProps } from "../types";

export interface ConnectifyDividerProps extends SeparatorProps, StyleProps {
  orientation?: "horizontal" | "vertical";
  size?: Sizes;
}
