import { ConnectifyMenuSectionProps } from "./menu.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useMenuSection } from "react-aria";
import { MenuItem } from "./menu-item";
import { ListSection } from "../list";

function MenuSection(props: ConnectifyMenuSectionProps, ref: DOMRef<HTMLUListElement>) {
  const { node, state, color, size } = props;

  const domRef = useDOMRef(ref);
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: node.rendered,
    "aria-label": node["aria-label"],
  });

  return (
    <ListSection
      ref={domRef}
      itemProps={itemProps}
      headingProps={headingProps}
      groupProps={groupProps}
      render={node.rendered}
      color={color}
      size={size}
    >
      {
        // @ts-ignore
        [...node.childNodes].map((node) => (
          <MenuItem key={node.key} node={node} state={state} {...node.props} />
        ))
      }
    </ListSection>
  );
}

const _MenuSection = forwardRef(MenuSection);
export { _MenuSection as MenuSection };
