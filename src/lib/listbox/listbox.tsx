import { ConnectifyListboxProps } from "./listbox.props";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useListState } from "react-stately";
import { useListBox } from "react-aria";
import { ListContainer } from "../list";
import { ListboxItem } from "./listbox-item";
import { ListboxSection } from "./listbox-section";

function Listbox(props: ConnectifyListboxProps, ref: DOMRef<HTMLUListElement>) {
  const { state: stateFromProps, color, size, className, style } = props;

  const domRef = useDOMRef(ref);
  const stateFromHook = useListState(props);
  const state = stateFromProps || stateFromHook;
  const { listBoxProps, ...otherProps } = useListBox(props, state, domRef);

  return (
    <div className={className} style={style}>
      <ListContainer ref={domRef} listProps={listBoxProps} color={color} size={size}>
        {
          // @ts-ignore
          [...state.collection].map((node) =>
            node.type === "section" ? (
              <ListboxSection key={node.key} node={node} state={state} {...node.props} />
            ) : (
              <ListboxItem key={node.key} node={node} state={state} {...node.props} />
            ),
          )
        }
      </ListContainer>
    </div>
  );
}

const _Listbox = forwardRef(Listbox);
export { _Listbox as Listbox };
