import { AriaSearchFieldProps } from "react-aria";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "../field";

export interface ConnectifySearchInputProps
  extends AriaSearchFieldProps,
    Omit<ConnectifyFieldInputBaseProps, "startContent" | "endContent">,
    ConnectifyFieldBaseProps {}
