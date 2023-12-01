import { ConnectifyHelperTextProps } from "./field.props";
import { helperTextStyles } from "./field.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function HelperText(props: ConnectifyHelperTextProps, ref: DOMRef<HTMLParagraphElement>) {
  const { description, descriptionProps, errorMessage, errorMessageProps, isInvalid } = props;
  const textProps = isInvalid ? errorMessageProps : descriptionProps;

  const domRef = useDOMRef(ref);

  const errorNode = typeof errorMessage !== "function" && errorMessage;

  return (
    <p ref={domRef} {...textProps} className={helperTextStyles({ isInvalid })}>
      {isInvalid ? errorNode : description}
    </p>
  );
}

const _HelperText = forwardRef(HelperText);
export { _HelperText as HelperText };
