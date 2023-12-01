import { ConnectifyTextareaProps } from "./textarea.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useTextField } from "react-aria";
import { Field, FieldTextInput } from "../field";
import { useFormSlots } from "../form";

function Textarea(originalProps: ConnectifyTextareaProps, ref: DOMRef<HTMLInputElement>) {
  const { register, radius, lines = 10, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const { inputProps, ...otherProps } = useTextField(props, domRef);

  return (
    <Field {...mergeProps(props, otherProps)} radius={radius === "full" ? "lg" : radius}>
      <FieldTextInput ref={domRef} inputProps={mergeProps(inputProps, register)} {...props} lines={lines} />
    </Field>
  );
}

const _Textarea = forwardRef(Textarea);
export { _Textarea as Textarea };
