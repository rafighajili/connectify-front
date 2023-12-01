import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { ConnectifyFieldBaseProps } from "../field";

export interface ConnectifyFormBaseProps extends Omit<ConnectifyFieldBaseProps, "register" | "className" | "style"> {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isContrasted?: boolean;
}

export interface ConnectifyFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    ConnectifyFormBaseProps {}
