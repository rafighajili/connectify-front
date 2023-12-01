import { ChildrenProps, Sizes, StyleProps } from "../types";
import { DOMAttributes, ElementType, InputHTMLAttributes, ReactNode } from "react";
import { AriaButtonProps } from "react-aria";
import { ValidationResult } from "@react-types/shared";
import { UseFormRegisterReturn } from "react-hook-form";

export interface ConnectifyFieldBaseProps extends StyleProps {
  size?: Sizes;
  radius?: Sizes | "full" | "none";
  labelNecessityIndicator?: "symbol" | "text";
  isRequired?: boolean;
  isInvalid?: boolean;
  register?: UseFormRegisterReturn<string>;
}

export interface ConnectifyFieldProps extends ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps, ChildrenProps {
  label?: ReactNode;
  labelProps?: DOMAttributes<HTMLLabelElement>;
  labelElementType?: ElementType;
  description?: ReactNode;
  descriptionProps?: DOMAttributes<HTMLParagraphElement>;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
  errorMessageProps?: DOMAttributes<HTMLParagraphElement>;
  groupProps?: DOMAttributes<HTMLDivElement>;
  startButton?: ReactNode;
  endButton?: ReactNode;
  radius?: Sizes | "full" | "none";
}

export interface ConnectifyLabelProps extends Pick<ConnectifyFieldProps, "labelProps" | "isRequired">, ChildrenProps {
  elementType?: ConnectifyFieldProps["labelElementType"];
  necessityIndicator?: ConnectifyFieldProps["labelNecessityIndicator"];
}

export interface ConnectifyHelperTextProps
  extends Pick<
    ConnectifyFieldProps,
    "errorMessage" | "errorMessageProps" | "description" | "descriptionProps" | "isInvalid"
  > {}

export interface ConnectifyFieldInputBaseProps {
  startContent?: ReactNode;
  endContent?: ReactNode;
  isContrasted?: boolean;
}

export interface ConnectifyFieldTextInputProps extends ConnectifyFieldInputBaseProps, ChildrenProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  fieldProps?: DOMAttributes<HTMLDivElement>;
  isDisabled?: boolean;
  lines?: number;
}

export interface ConnectifyFieldButtonProps extends AriaButtonProps, ConnectifyFieldInputBaseProps {
  isIconOnly: boolean;
}
