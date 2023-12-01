import { createContext, ReactNode, useContext } from "react";
import { mergeProps } from "react-aria";

type CreateSlotsReturn<S extends Record<string, any>> = [
  (props: { children: ReactNode; value: S }) => ReactNode,
  <P extends Record<string, any>>(props?: P) => S & P,
];

export function createSlots<SlotsType extends Record<string, any>>(): CreateSlotsReturn<SlotsType> {
  const Slots = createContext<SlotsType | undefined>(undefined);

  function SlotsProvider({ children, value }: { children: ReactNode; value: SlotsType }) {
    return <Slots.Provider value={useSlots(value)}>{children}</Slots.Provider>;
  }

  function useSlots<T extends Record<string, any>>(props?: T) {
    return mergeProps(useContext(Slots), props) as SlotsType & T;
  }

  return [SlotsProvider, useSlots];
}
