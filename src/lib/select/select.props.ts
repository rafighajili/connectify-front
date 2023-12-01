import { AriaSelectProps } from "react-aria";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "../field";

export interface ConnectifySelectProps
  extends AriaSelectProps<object>,
    ConnectifyFieldInputBaseProps,
    ConnectifyFieldBaseProps {}
