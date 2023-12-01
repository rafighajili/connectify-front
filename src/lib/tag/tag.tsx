import { ConnectifyTagProps } from "./tag.props";
import { tagButtonStyles, tagStyles } from "./tag.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef, useRef } from "react";
import { mergeProps, useButton, useFocusRing, useHover, useTag } from "react-aria";
import { ConnectifyXMarkIcon } from "../icons";

function Tag(props: ConnectifyTagProps, ref: DOMRef<HTMLDivElement>) {
  const { item, state, size } = props;

  const domRef = useDOMRef(ref);
  const {
    rowProps,
    gridCellProps,
    removeButtonProps,
    isDisabled,
    isPressed,
    isSelected,
    allowsSelection,
    allowsRemoving,
  } = useTag(props, state, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing({});

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed: isButtonPressed } = useButton(removeButtonProps, buttonRef);
  const { hoverProps: buttonHoverProps, isHovered: isButtonHovered } = useHover({});

  return (
    <div
      ref={domRef}
      {...mergeProps(rowProps, hoverProps, focusProps)}
      tabIndex={-1}
      className={tagStyles({
        size,
        isDisabled,
        isHovered: isHovered && (allowsSelection || allowsRemoving),
        isPressed,
        isSelected,
        isFocusVisible,
      })}
    >
      <div {...gridCellProps}>
        {item.rendered}
        {allowsRemoving && isHovered && (
          <button
            ref={buttonRef}
            {...mergeProps(buttonProps, buttonHoverProps)}
            className={tagButtonStyles({ size, isPressed: isButtonPressed, isHovered: isButtonHovered })}
          >
            <ConnectifyXMarkIcon />
          </button>
        )}
      </div>
    </div>
  );
}

const _Tag = forwardRef(Tag);
export { _Tag as Tag };
