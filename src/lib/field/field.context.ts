import { createSlots } from "../utils";
import { ConnectifyFieldBaseProps, ConnectifyFieldInputBaseProps } from "./field.props";

export const [FieldSlotsProvider, useFieldSlots] = createSlots<
  Pick<ConnectifyFieldBaseProps, "size" | "radius" | "isInvalid"> & Pick<ConnectifyFieldInputBaseProps, "isContrasted">
>();
