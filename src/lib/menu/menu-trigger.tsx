import { MenuSlotsProvider } from "./menu.context";
import { ConnectifyMenuTriggerProps } from "./menu.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { cloneElement, forwardRef } from "react";
import { useMenuTrigger } from "react-aria";
import { useMenuTriggerState } from "react-stately";

function MenuTrigger(props: ConnectifyMenuTriggerProps, ref: DOMRef<HTMLDivElement>) {
  const { children } = props;

  const domRef = useDOMRef(ref);

  const state = useMenuTriggerState(props);
  const { menuTriggerProps, menuProps } = useMenuTrigger(props, state, domRef);

  const [trigger, menu] = children;

  return (
    <>
      {cloneElement(trigger, { ...menuTriggerProps, ref: domRef })}
      {state.isOpen && (
        <MenuSlotsProvider value={{ state, triggerRef: domRef }}>{cloneElement(menu, menuProps)}</MenuSlotsProvider>
      )}
    </>
  );
}

const _MenuTrigger = forwardRef(MenuTrigger);
export { _MenuTrigger as MenuTrigger };
