import { Ref, RefObject } from "react";

export type DOMRef<T extends HTMLElement = HTMLElement> = Ref<T> | RefObject<T>;
