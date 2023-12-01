import { ConnectifyTextInputProps } from "./text-input.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useTextField } from "react-aria";
import { Field, FieldTextInput } from "../field";
import { useFormSlots } from "../form";

function TextInput(originalProps: ConnectifyTextInputProps, ref: DOMRef<HTMLInputElement>) {
  const { register, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const { inputProps, ...otherProps } = useTextField(props, domRef);

  return (
    <Field {...mergeProps(props, otherProps)}>
      <FieldTextInput ref={domRef} inputProps={mergeProps(inputProps, register)} {...props} />
    </Field>
  );
}

const _TextInput = forwardRef(TextInput);
export { _TextInput as TextInput };
