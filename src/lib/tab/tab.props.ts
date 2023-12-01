import { Colors, Sizes, StyleProps } from "../types";
import { AriaTabListProps, AriaTabPanelProps, AriaTabProps } from "react-aria";
import { TabListState } from "react-stately";
import { Node } from "@react-types/shared";
import { ReactNode } from "react";

export interface ConnectifyTabsProps extends Omit<AriaTabListProps<object>, "orientation">, StyleProps {
  withoutPanel?: boolean;
  color?: Colors;
  size?: Sizes;
  radius?: Sizes | "none" | "full";
  fullWidth?: boolean;
}

export interface ConnectifyTabProps extends AriaTabProps {
  item: Node<object>;
  state: TabListState<object>;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export interface ConnectifyTabPanelProps extends AriaTabPanelProps {
  state: TabListState<object>;
}
