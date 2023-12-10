import { useFieldSlots } from "./field.context";
import { ConnectifyFieldTextInputProps } from "./field.props";
import { fieldTextInputStyles } from "./field.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useFocusRing, useHover } from "react-aria";

function FieldTextInput(originalProps: ConnectifyFieldTextInputProps, ref: DOMRef) {
  const props = useFieldSlots(originalProps);
  const {
    inputProps,
    fieldProps,
    lines,
    size,
    radius,
    startContent,
    endContent,
    isContrasted = true,
    isInvalid,
    isDisabled,
    children,
  } = props;
  const isMultiline = !!lines;
  const Component = isMultiline ? "textarea" : "input";

  const domRef = useDOMRef(ref);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

  const { base, self, content } = fieldTextInputStyles({
    size,
    radius,
    isMultiline,
    isContrasted,
    isInvalid,
    isDisabled,
    isHovered,
    isFocused,
    isFocusVisible,
    hasStartContent: !!startContent,
    hasEndContent: !!endContent,
  });

  return (
    <div {...hoverProps} className={base()}>
      {startContent && <div className={content()}>{startContent}</div>}

      {!!inputProps && (
        <Component
          {...mergeProps(inputProps, focusProps)}
          ref={domRef as DOMRef<HTMLInputElement & HTMLTextAreaElement>}
          className={self()}
          rows={lines}
        />
      )}
      {!!fieldProps && (
        <div {...mergeProps(fieldProps, focusProps)} ref={domRef as DOMRef<HTMLDivElement>} className={self()}>
          {children}
        </div>
      )}

      {endContent && <div className={content()}>{endContent}</div>}
    </div>
  );
}

const _FieldTextInput = forwardRef(FieldTextInput);
export { _FieldTextInput as FieldTextInput };
