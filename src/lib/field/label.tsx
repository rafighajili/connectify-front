import { ConnectifyLabelProps } from "./field.props";
import { labelStyles } from "./field.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function Label(props: ConnectifyLabelProps, ref: DOMRef) {
  const { labelProps, necessityIndicator, isRequired, elementType: Component = "label", children } = props;
  const necessityLabel = isRequired ? "(required)" : "(optional)";

  const domRef = useDOMRef(ref);

  return (
    <Component ref={domRef} {...labelProps} className={labelStyles()}>
      {children}
      {(necessityIndicator === "text" || (necessityIndicator === "symbol" && isRequired)) && " "}
      {necessityIndicator === "text" && necessityLabel}
      {necessityIndicator === "symbol" && isRequired && "*"}
    </Component>
  );
}

const _Label = forwardRef(Label);
export { _Label as Label };
