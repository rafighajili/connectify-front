import { AriaMenuProps, AriaMenuTriggerProps } from "react-aria";
import { ReactElement } from "react";
import { MenuTriggerProps, TreeState } from "react-stately";
import { ConnectifyPopoverProps, ConnectifyUnderlayProps } from "../overlays";
import { ConnectifyListItemProps, ConnectifyListStyleProps } from "../list";
import { Node } from "@react-types/shared";

export interface ConnectifyMenuTriggerProps extends Omit<AriaMenuTriggerProps, "type">, MenuTriggerProps {
  children: [ReactElement, ReactElement];
}

export interface ConnectifyMenuProps
  extends AriaMenuProps<object>,
    ConnectifyListStyleProps,
    Partial<
      Omit<
        ConnectifyPopoverProps & ConnectifyUnderlayProps,
        "children" | "state" | "triggerRef" | "size" | "className" | "style"
      >
    > {}

export interface ConnectifyMenuSectionProps extends ConnectifyListStyleProps {
  node: Node<object>;
  state: TreeState<object>;
}

export interface ConnectifyMenuItemProps
  extends ConnectifyListStyleProps,
    Pick<ConnectifyListItemProps, "startContent" | "endContent"> {
  node: Node<object>;
  state: TreeState<object>;
}
