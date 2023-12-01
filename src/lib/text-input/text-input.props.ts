import { AriaTextFieldProps } from "react-aria";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "../field";

export interface ConnectifyTextInputProps
  extends AriaTextFieldProps,
    ConnectifyFieldInputBaseProps,
    ConnectifyFieldBaseProps {}
