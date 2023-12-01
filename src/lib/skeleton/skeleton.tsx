import { ConnectifySkeletonProps } from "./skeleton.props";
import { skeletonStyles } from "./skeleton.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";

function Skeleton(props: ConnectifySkeletonProps, ref: DOMRef<HTMLDivElement>) {
  const { disableAnimation, className, style } = props;

  const domRef = useDOMRef(ref);

  return <div ref={domRef} className={skeletonStyles({ disableAnimation, className })} style={style} />;
}

const _Skeleton = forwardRef(Skeleton);
export { _Skeleton as Skeleton };
