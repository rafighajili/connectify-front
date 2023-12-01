import { ConnectifySearchInputProps } from "./search-input.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, useState } from "react";
import { mergeProps, useSearchField } from "react-aria";
import { Field, FieldTextInput } from "../field";
import { ConnectifyMagnifyingGlassIcon, ConnectifyXMarkIcon } from "../icons";
import { useSearchFieldState } from "react-stately";
import { Button } from "../button";
import { useFormSlots } from "../form";

function SearchInput(originalProps: ConnectifySearchInputProps, ref: DOMRef<HTMLInputElement>) {
  const { register, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const state = useSearchFieldState(props);
  const { inputProps, clearButtonProps, ...otherProps } = useSearchField(props, state, domRef);

  const [isClearButtonPressed, setIsClearButtonPressed] = useState<boolean>(false);

  return (
    <Field {...mergeProps(props, otherProps)}>
      <FieldTextInput
        ref={domRef}
        inputProps={mergeProps(inputProps, register)}
        {...props}
        startContent={<ConnectifyMagnifyingGlassIcon />}
        endContent={
          state.value && (
            <Button
              {...clearButtonProps}
              size={props.size}
              variant="light"
              isIconOnly
              radius="full"
              onPressChange={setIsClearButtonPressed}
              className={isClearButtonPressed ? "scale-[.6]" : "scale-[.7]"}
            >
              <ConnectifyXMarkIcon />
            </Button>
          )
        }
      />
    </Field>
  );
}

const _SearchInput = forwardRef(SearchInput);
export { _SearchInput as SearchInput };
