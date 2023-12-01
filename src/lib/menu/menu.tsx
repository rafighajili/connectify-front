import { useMenuSlots } from "./menu.context";
import { ConnectifyMenuProps } from "./menu.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, Fragment } from "react";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import { ListContainer } from "../list";
import { MenuItem } from "./menu-item";
import { MenuSection } from "./menu-section";
import { Popover } from "../overlays";

function Menu(originalProps: ConnectifyMenuProps, ref: DOMRef<HTMLUListElement>) {
  const props = useMenuSlots(originalProps);
  const { state: menuState, triggerRef, color, size, ...otherProps } = props;

  const domRef = useDOMRef(ref);
  const state = useTreeState(props);
  const { menuProps } = useMenu(props, state, domRef);

  return (
    <Popover state={menuState} triggerRef={triggerRef} size="full" {...otherProps}>
      <ListContainer ref={domRef} listProps={menuProps} color={color} size={size}>
        {
          // @ts-ignore
          [...state.collection].map((node) => (
            <Fragment key={node.key}>
              {node.type === "section" ? (
                <MenuSection key={node.key} node={node} state={state} {...node.props} />
              ) : (
                <MenuItem key={node.key} node={node} state={state} {...node.props} />
              )}
            </Fragment>
          ))
        }
      </ListContainer>
    </Popover>
  );
}

const _Menu = forwardRef(Menu);
export { _Menu as Menu };
