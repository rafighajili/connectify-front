import { useListSlots } from "./list.context";
import { ConnectifyListSectionProps } from "./list.props";
import { listSectionStyles } from "./list.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { ListContainer } from "./list-container";

function ListSection(props: ConnectifyListSectionProps, ref: DOMRef<HTMLUListElement>) {
  const { itemProps, headingProps, groupProps, render, color, size, children } = useListSlots(props);

  const domRef = useDOMRef(ref);

  return (
    <li {...itemProps}>
      {render && (
        <div {...headingProps} className={listSectionStyles({ color, size })}>
          {render}
        </div>
      )}
      <ListContainer ref={domRef} listProps={groupProps} color={color} size={size}>
        {children}
      </ListContainer>
    </li>
  );
}

const _ListSection = forwardRef(ListSection);
export { _ListSection as ListSection };
