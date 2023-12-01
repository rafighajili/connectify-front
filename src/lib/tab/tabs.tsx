import { TabsSlotsProvider } from "./tab.context";
import { ConnectifyTabPanelProps, ConnectifyTabsProps } from "./tab.props";
import { tabListStyles, tabPanelStyles, tabsStyles } from "./tab.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, useRef } from "react";
import { useTabListState } from "react-stately";
import { mergeProps, useFocusRing, useTabList, useTabPanel } from "react-aria";
import { Tab } from "./tab";

function Tabs(props: ConnectifyTabsProps, ref: DOMRef<HTMLDivElement>) {
  const {
    withoutPanel = false,
    color = "default",
    size = "md",
    radius = "md",
    fullWidth,
    isDisabled,
    className,
    style,
  } = props;

  const domRef = useDOMRef(ref);
  const tabListRef = useRef<HTMLDivElement>(null);

  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, tabListRef);

  return (
    <TabsSlotsProvider value={{ color, radius, size }}>
      <div ref={domRef} className={tabsStyles({ className })} style={style}>
        <div ref={tabListRef} {...tabListProps} className={tabListStyles({ radius, size, fullWidth, isDisabled })}>
          {
            // @ts-ignore
            [...state.collection].map((item) => (
              <Tab key={item.key} item={item} state={state} />
            ))
          }
        </div>

        {!withoutPanel && <TabPanel state={state} />}
      </div>
    </TabsSlotsProvider>
  );
}

function TabPanel(props: ConnectifyTabPanelProps) {
  const { state } = props;

  const domRef = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, domRef);
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <div ref={domRef} {...mergeProps(tabPanelProps, focusProps)} className={tabPanelStyles({ isFocusVisible })}>
      {state.selectedItem?.props.children}
    </div>
  );
}

const _Tabs = forwardRef(Tabs);
export { _Tabs as Tabs };
