import { ChildrenProps, Colors, Sizes } from "../types";
import { DOMAttributes, ReactNode } from "react";

export interface ConnectifyListStyleProps {
  color?: Colors;
  size?: Sizes;
}

export interface ConnectifyListContainerProps extends ConnectifyListStyleProps, ChildrenProps {
  listProps: any;
}

export interface ConnectifyListSectionProps extends ConnectifyListStyleProps, ChildrenProps {
  itemProps: DOMAttributes<any>;
  headingProps: DOMAttributes<any>;
  groupProps: DOMAttributes<any>;
  render?: ReactNode;
}

export interface ConnectifyListItemProps extends ConnectifyListStyleProps {
  itemProps: DOMAttributes<any>;
  render?: ReactNode;
  isDisabled: boolean;
  isPressed: boolean;
  isSelected: boolean;
  isFocusVisible?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
