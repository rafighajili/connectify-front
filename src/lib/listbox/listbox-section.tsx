import { ConnectifyListboxSectionProps } from "./listbox.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useListBoxSection } from "react-aria";
import { ListboxItem } from "./listbox-item";
import { ListSection } from "../list";

function ListboxSection(props: ConnectifyListboxSectionProps, ref: DOMRef<HTMLUListElement>) {
  const { node, state, color, size } = props;

  const domRef = useDOMRef(ref);
  const { itemProps, headingProps, groupProps } = useListBoxSection({
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
          <ListboxItem key={node.key} node={node} state={state} {...node.props} />
        ))
      }
    </ListSection>
  );
}

const _ListboxSection = forwardRef(ListboxSection);
export { _ListboxSection as ListboxSection };
