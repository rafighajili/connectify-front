import { ConnectifyNumberInputProps } from "./number-input.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useLocale, useNumberField } from "react-aria";
import { Field, FieldButton, FieldTextInput } from "../field";
import { useNumberFieldState } from "react-stately";
import { ConnectifyMinusIcon, ConnectifyPlusIcon } from "../icons";
import { useFormSlots } from "../form";

function NumberInput(originalProps: ConnectifyNumberInputProps, ref: DOMRef<HTMLInputElement>) {
  const { register, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const { inputProps, decrementButtonProps, incrementButtonProps, ...otherProps } = useNumberField(
    props,
    state,
    domRef,
  );

  return (
    <Field
      {...mergeProps(props, otherProps)}
      startButton={
        <FieldButton isIconOnly={true} {...decrementButtonProps}>
          <ConnectifyMinusIcon />
        </FieldButton>
      }
      endButton={
        <FieldButton isIconOnly={true} {...incrementButtonProps}>
          <ConnectifyPlusIcon />
        </FieldButton>
      }
    >
      <FieldTextInput ref={domRef} inputProps={mergeProps(inputProps, register)} {...props} />
    </Field>
  );
}

const _NumberInput = forwardRef(NumberInput);
export { _NumberInput as NumberInput };
