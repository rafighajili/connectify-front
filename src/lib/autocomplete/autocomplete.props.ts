import { AriaComboBoxProps } from "react-aria";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "../field";

export interface ConnectifyAutocompleteProps
  extends AriaComboBoxProps<object>,
    ConnectifyFieldInputBaseProps,
    ConnectifyFieldBaseProps {}
