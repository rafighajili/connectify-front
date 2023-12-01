import { useTabsSlots } from "./tab.context";
import { ConnectifyTabProps } from "./tab.props";
import { tabStyles } from "./tab.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useFocusRing, useHover, useTab } from "react-aria";

function Tab(originalProps: ConnectifyTabProps, ref: DOMRef<HTMLDivElement>) {
  const props = useTabsSlots(originalProps);
  const { item, state, color, size, radius, startContent, endContent } = props;

  const domRef = useDOMRef(ref);
  const { tabProps, isDisabled, isPressed, isSelected } = useTab({ key: item.key }, state, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <div
      ref={domRef}
      {...mergeProps(tabProps, hoverProps, focusProps)}
      className={tabStyles({ color, size, radius, isDisabled, isHovered, isPressed, isSelected, isFocusVisible })}
    >
      {startContent}
      {item.rendered}
      {endContent}
    </div>
  );
}

const _Tab = forwardRef(Tab);
export { _Tab as Tab };
