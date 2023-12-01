import { AriaTagGroupProps } from "react-aria";
import { Sizes, StyleProps } from "../types";
import { ReactNode } from "react";
import { Node } from "@react-types/shared";
import { ListState } from "react-stately";

export interface ConnectifyTagsProps extends AriaTagGroupProps<object>, StyleProps {
  actionContent?: ReactNode;
  onAction?: () => void;
  size?: Sizes;
  align?: "start" | "center" | "end";
}

export interface ConnectifyTagProps {
  item: Node<object>;
  state: ListState<object>;
  size: Sizes;
}
