import { ConnectifyAutocompleteProps } from "./autocomplete.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, useRef } from "react";
import { mergeProps, useComboBox, useFilter } from "react-aria";
import { Field, FieldButton, FieldTextInput } from "../field";
import { useFormSlots } from "../form";
import { useComboBoxState } from "react-stately";
import { ConnectifyChevronDownIcon } from "../icons";
import { Popover } from "../overlays";
import { Listbox } from "../listbox";

function Autocomplete(originalProps: ConnectifyAutocompleteProps, ref: DOMRef<HTMLInputElement>) {
  const { register, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const fieldRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });
  const { inputProps, buttonProps, listBoxProps, ...otherProps } = useComboBox(
    {
      ...props,
      inputRef: domRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  return (
    <>
      <Field
        ref={fieldRef}
        {...mergeProps(props, otherProps)}
        endButton={
          <FieldButton {...buttonProps} ref={buttonRef} isIconOnly={true}>
            <ConnectifyChevronDownIcon />
          </FieldButton>
        }
      >
        <FieldTextInput
          ref={domRef}
          inputProps={mergeProps(inputProps, register)}
          {...{ ...props, children: undefined }}
        />
      </Field>

      {state.isOpen && (
        <Popover ref={popoverRef} triggerRef={fieldRef} state={state} size="full">
          {/* @ts-ignore */}
          <Listbox
            {...listBoxProps}
            ref={listBoxRef}
            state={state}
            size={props.size}
            className="max-h-96 overflow-y-auto"
            style={{ width: `${fieldRef.current?.offsetWidth}px` }}
          />
        </Popover>
      )}
    </>
  );
}

const _Autocomplete = forwardRef(Autocomplete);
export { _Autocomplete as Autocomplete };
