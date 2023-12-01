import { DialogSlotsProvider } from "./dialog.context";
import { ConnectifyDialogTriggerProps } from "./dialog.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { cloneElement, forwardRef } from "react";
import { useOverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";

function DialogTrigger(props: ConnectifyDialogTriggerProps, ref: DOMRef) {
  const { children } = props;

  const domRef = useDOMRef(ref);
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state, domRef);

  const [trigger, content] = children;

  return (
    <>
      {cloneElement(trigger, { ...triggerProps, ref: domRef })}
      {state.isOpen && (
        <DialogSlotsProvider value={{ state, triggerRef: domRef }}>
          {cloneElement(typeof content === "function" ? content(state.close) : content, overlayProps)}
        </DialogSlotsProvider>
      )}
    </>
  );
}

const _DialogTrigger = forwardRef(DialogTrigger);
export { _DialogTrigger as DialogTrigger };
