import { ConnectifyTooltipProps } from "./tooltip.props";
import { tooltipStyles } from "./tooltip.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, useRef } from "react";
import { useTooltipTriggerState } from "react-stately";
import { mergeProps, Overlay, useOverlayPosition, useTooltip, useTooltipTrigger } from "react-aria";
import { Card } from "../index";

function Tooltip(props: ConnectifyTooltipProps, ref: DOMRef<HTMLDivElement>) {
  const { placement = "top", offset = 16, closeDelay = 0, delay = 500, children, content } = props;

  const domRef = useDOMRef(ref);
  const triggerRef = useRef(null);

  const state = useTooltipTriggerState({ ...props, closeDelay, delay });
  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(props, state, triggerRef);
  const { tooltipProps } = useTooltip(mergeProps(props, triggerTooltipProps), state);
  const { overlayProps } = useOverlayPosition({
    ...mergeProps(props, state),
    overlayRef: domRef,
    targetRef: triggerRef,
    placement,
    offset,
  });

  return (
    <>
      {/*{cloneElement(children, { ref: triggerRef, ...triggerProps })}*/}
      <span ref={triggerRef} {...triggerProps}>
        {children}
      </span>
      {state.isOpen && (
        <Overlay>
          <Card ref={domRef} {...mergeProps(tooltipProps, overlayProps)} className={tooltipStyles()}>
            {content}
          </Card>
        </Overlay>
      )}
    </>
  );
}

const _Tooltip = forwardRef(Tooltip);
export { _Tooltip as Tooltip };
