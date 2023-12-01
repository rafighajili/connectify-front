import { ListSlotsProvider } from "./list.context";
import { ConnectifyListContainerProps } from "./list.props";
import { listContainerStyles } from "./list.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function ListContainer(props: ConnectifyListContainerProps, ref: DOMRef<HTMLUListElement>) {
  const { listProps, color = "default", size = "md", children } = props;

  const domRef = useDOMRef(ref);

  return (
    <ListSlotsProvider value={{ color, size }}>
      <ul ref={domRef} {...listProps} className={listContainerStyles({ size })}>
        {children}
      </ul>
    </ListSlotsProvider>
  );
}

const _ListContainer = forwardRef(ListContainer);
export { _ListContainer as ListContainer };
