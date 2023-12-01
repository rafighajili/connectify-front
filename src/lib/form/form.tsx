import { FormSlotsProvider } from "./form.context";
import { ConnectifyFormProps } from "./form.props";
import { DOMRef } from "../types";
import { forwardRef } from "react";

function Form(props: ConnectifyFormProps, ref: DOMRef<HTMLFormElement>) {
  const {
    size,
    radius,
    labelNecessityIndicator,
    isContrasted,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...otherProps
  } = props;

  return (
    <FormSlotsProvider
      value={{ size, radius, labelNecessityIndicator, isContrasted, isRequired, isInvalid, isDisabled, isReadOnly }}
    >
      <form ref={ref} {...otherProps} />
    </FormSlotsProvider>
  );
}

const _Form = forwardRef(Form);
export { _Form as Form };
