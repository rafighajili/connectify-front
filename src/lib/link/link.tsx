import { ConnectifyLinkProps } from "./link.props";
import { linkStyles } from "./link.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import NextLink from "next/link";
import { mergeProps, useFocusRing, useHover, useLink } from "react-aria";

function Link(props: ConnectifyLinkProps, ref: DOMRef<HTMLAnchorElement>) {
  const { isDisabled, children, className, style } = props;

  const domRef = useDOMRef(ref);
  const { linkProps, isPressed } = useLink(props, domRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing(props);

  return (
    //  @ts-ignore
    <NextLink
      ref={domRef}
      {...mergeProps(linkProps, hoverProps, focusProps)}
      className={linkStyles({ isDisabled, isHovered, isPressed, isFocusVisible, className })}
      style={style}
    >
      {children}
    </NextLink>
  );
}

const _Link = forwardRef(Link);
export { _Link as Link };
