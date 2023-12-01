import { AriaListBoxProps } from "react-aria";
import { ListState } from "react-stately";
import { ConnectifyListItemProps, ConnectifyListStyleProps } from "../list";
import { Node } from "@react-types/shared";
import { StyleProps } from "#/lib/types";

export interface ConnectifyListboxProps extends AriaListBoxProps<object>, ConnectifyListStyleProps, StyleProps {
  state?: ListState<object>;
}

export interface ConnectifyListboxSectionProps extends ConnectifyListStyleProps {
  node: Node<object>;
  state: ListState<object>;
}

export interface ConnectifyListboxItemProps
  extends ConnectifyListStyleProps,
    Pick<ConnectifyListItemProps, "startContent" | "endContent"> {
  node: Node<object>;
  state: ListState<object>;
}
