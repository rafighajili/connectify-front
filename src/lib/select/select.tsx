import { ConnectifySelectProps } from "./select.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { HiddenSelect, mergeProps, useSelect } from "react-aria";
import { Field, FieldButton } from "../field";
import { useFormSlots } from "../form";
import { useSelectState } from "react-stately";
import { ConnectifyChevronDownIcon } from "../icons";
import { Popover } from "../overlays";
import { Listbox } from "../listbox";

function Select(originalProps: ConnectifySelectProps, ref: DOMRef<HTMLButtonElement>) {
  const { register, ...props } = useFormSlots(originalProps);

  const domRef = useDOMRef(register?.ref || ref);
  const state = useSelectState(props);
  const { triggerProps, menuProps, valueProps, ...otherProps } = useSelect(props, state, domRef);

  return (
    <Field {...mergeProps(props, otherProps)}>
      <HiddenSelect
        triggerRef={domRef}
        state={state}
        label={props.label}
        name={props.name}
        isDisabled={props.isDisabled}
        {...{ ...register, ref: undefined }}
      />

      <FieldButton
        {...mergeProps(props, triggerProps)}
        ref={domRef}
        isIconOnly={false}
        endContent={<ConnectifyChevronDownIcon />}
      >
        <div {...valueProps}>{state.selectedItem ? state.selectedItem.rendered : <i>Select an option...</i>}</div>
      </FieldButton>

      {state.isOpen && (
        <Popover triggerRef={domRef} state={state} size="full">
          {/* @ts-ignore */}
          <Listbox
            {...menuProps}
            state={state}
            size={props.size}
            className="max-h-96 overflow-y-auto"
            style={{ width: `${domRef.current?.offsetWidth}px` }}
          />
        </Popover>
      )}
    </Field>
  );
}

const _Select = forwardRef(Select);
export { _Select as Select };
