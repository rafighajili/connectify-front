import { AriaDialogProps } from "react-aria";
import { ChildrenProps, StyleProps } from "../types";
import { OverlayTriggerProps } from "react-stately";
import { ReactElement } from "react";
import { ConnectifyModalProps, ConnectifyPopoverProps } from "../overlays";

export interface ConnectifyModalDialogProps extends Omit<ConnectifyModalProps, "state">, AriaDialogProps {}

export interface ConnectifyPopoverDialogProps
  extends Omit<ConnectifyPopoverProps, "state" | "triggerRef">,
    AriaDialogProps {}

export interface ConnectifyDialogProps extends AriaDialogProps, ChildrenProps {}

export interface ConnectifyDialogHeaderProps extends ChildrenProps, StyleProps {}

export interface ConnectifyDialogBodyProps extends ChildrenProps, StyleProps {}

export interface ConnectifyDialogFooterProps extends ChildrenProps, StyleProps {}

export interface ConnectifyDialogTriggerProps extends OverlayTriggerProps {
  children: [ReactElement, ReactElement | ((close: () => void) => ReactElement)];
}
