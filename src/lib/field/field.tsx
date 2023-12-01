import { FieldSlotsProvider } from "./field.context";
import { ConnectifyFieldProps } from "./field.props";
import { fieldStyles } from "./field.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { Label } from "./label";
import { HelperText } from "./helper-text";

function Field(props: ConnectifyFieldProps, ref: DOMRef<HTMLDivElement>) {
  const {
    size = "md",
    radius = "md",
    label,
    labelProps,
    labelElementType,
    labelNecessityIndicator = "symbol",
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    groupProps,
    startButton,
    endButton,
    isContrasted = true,
    isInvalid,
    isRequired,
    children,
    className,
    style,
  } = props;

  const domRef = useDOMRef(ref);

  const { base, self } = fieldStyles({ hasStartButton: !!startButton, hasEndButton: !!endButton });

  return (
    <FieldSlotsProvider value={{ size, radius, isContrasted, isInvalid }}>
      <div ref={domRef} className={base({ className })} style={style}>
        {label && (
          <Label
            labelProps={labelProps}
            elementType={labelElementType}
            necessityIndicator={labelNecessityIndicator}
            isRequired={isRequired}
          >
            {label}
          </Label>
        )}

        <div {...groupProps} className={self()}>
          {startButton}
          {children}
          {endButton}
        </div>

        {(description || errorMessage) && (
          <HelperText
            description={description}
            descriptionProps={descriptionProps}
            errorMessage={errorMessage}
            errorMessageProps={errorMessageProps}
            isInvalid={isInvalid}
          />
        )}
      </div>
    </FieldSlotsProvider>
  );
}

const _Field = forwardRef(Field);
export { _Field as Field };
