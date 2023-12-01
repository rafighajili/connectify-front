import { ConnectifyMenuItemProps } from "./menu.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useMenuItem } from "react-aria";
import { ListItem } from "../list";

function MenuItem(props: ConnectifyMenuItemProps, ref: DOMRef<HTMLLIElement>) {
  const { node, state, color, size, startContent, endContent } = props;

  const domRef = useDOMRef(ref);
  const { menuItemProps, isDisabled, isPressed, isSelected } = useMenuItem(
    { key: node.key, "aria-label": node["aria-label"] },
    state,
    domRef,
  );

  return (
    <ListItem
      ref={domRef}
      render={node.rendered}
      itemProps={menuItemProps}
      isDisabled={isDisabled}
      isPressed={isPressed}
      isSelected={isSelected}
      color={color}
      size={size}
      startContent={startContent}
      endContent={endContent}
    />
  );
}

const _MenuItem = forwardRef(MenuItem);
export { _MenuItem as MenuItem };
