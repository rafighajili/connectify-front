import { ConnectifyTagsProps } from "./tag.props";
import { tagsActionButtonStyles, tagSkeletonStyles, tagsStyles } from "./tag.styles";
import { DOMRef } from "../types";
import { useDOMRef } from "../utils";
import { forwardRef } from "react";
import { useListState } from "react-stately";
import { useTagGroup } from "react-aria";
import { Tag } from "./tag";
import { Button, Skeleton } from "#/lib";

function Tags(props: ConnectifyTagsProps, ref: DOMRef<HTMLDivElement>) {
  const { actionContent, onAction, size = "sm", align = "start", className, style } = props;

  const domRef = useDOMRef(ref);
  const state = useListState(props);
  const { gridProps } = useTagGroup(props, state, domRef);

  return (
    <div ref={domRef} {...gridProps} tabIndex={-1} className={tagsStyles({ size, align, className })} style={style}>
      {
        // @ts-ignore
        [...state.collection].map((item) => (
          <Tag key={item.key} item={item} state={state} size={size} />
        ))
      }

      {!!onAction && !!actionContent && (
        <Button variant="light" onPress={onAction} className={tagsActionButtonStyles({ size })}>
          {actionContent}
        </Button>
      )}
    </div>
  );
}

const _Tags = forwardRef(Tags);
export { _Tags as Tags };

export function TagsSkeleton(
  props: Pick<ConnectifyTagsProps, "size" | "align" | "className" | "style"> & { tagsCount?: number },
) {
  const { tagsCount = 4, size = "sm", align = "start", className, style } = props;

  return (
    <div className={tagsStyles({ size, align, className })} style={style}>
      {Array(tagsCount)
        .fill("tag")
        .map((_, index) => (
          <Skeleton key={index} className={tagSkeletonStyles({ size })} />
        ))}
    </div>
  );
}
