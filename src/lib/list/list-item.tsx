import { useListSlots } from "./list.context";
import { ConnectifyListItemProps } from "./list.props";
import { listItemStyles } from "./list.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { ConnectifyCheckIcon } from "../icons";

function ListItem(props: ConnectifyListItemProps, ref: DOMRef<HTMLLIElement>) {
  const {
    itemProps,
    render,
    color,
    size,
    isDisabled,
    isPressed,
    isSelected,
    isFocusVisible,
    startContent,
    endContent,
  } = useListSlots(props);

  const domRef = useDOMRef(ref);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible: isFocusVisibleFromHook } = useFocusRing({});

  return (
    <li
      ref={domRef}
      {...mergeProps(itemProps, hoverProps, focusProps)}
      className={listItemStyles({
        color,
        size,
        isDisabled,
        isHovered,
        isPressed,
        isSelected,
        isFocusVisible: isFocusVisible || isFocusVisibleFromHook,
      })}
    >
      {startContent}
      <div className="flex-1">{render}</div>
      {(isSelected && <ConnectifyCheckIcon />) || endContent}
    </li>
  );
}

const _ListItem = forwardRef(ListItem);
export { _ListItem as ListItem };
