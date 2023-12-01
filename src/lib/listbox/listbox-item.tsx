import { ConnectifyListboxItemProps } from "./listbox.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useOption } from "react-aria";
import { ListItem } from "../list";

function ListboxItem(props: ConnectifyListboxItemProps, ref: DOMRef<HTMLLIElement>) {
  const { node, state, color, size, startContent, endContent } = props;

  const domRef = useDOMRef(ref);
  const { optionProps, isDisabled, isPressed, isSelected, isFocusVisible } = useOption(
    { key: node.key, "aria-label": node["aria-label"] },
    state,
    domRef,
  );

  return (
    <ListItem
      ref={domRef}
      render={node.rendered}
      itemProps={optionProps}
      isDisabled={isDisabled}
      isPressed={isPressed}
      isSelected={isSelected}
      isFocusVisible={isFocusVisible}
      color={color}
      size={size}
      startContent={startContent}
      endContent={endContent}
    />
  );
}

const _ListboxItem = forwardRef(ListboxItem);
export { _ListboxItem as ListboxItem };
