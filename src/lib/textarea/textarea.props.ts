import { AriaTextFieldProps } from "react-aria";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "../field";

export interface ConnectifyTextareaProps
  extends AriaTextFieldProps,
    ConnectifyFieldInputBaseProps,
    ConnectifyFieldBaseProps {
  lines?: number;
}
