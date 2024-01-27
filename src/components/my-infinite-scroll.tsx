import InfiniteScroll from "react-infinite-scroll-component";
import { MetaType } from "#/entities";
import { Children } from "#/types";
import { Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export function MyInfiniteScroll({
  setPage,
  meta,
  children,
}: { setPage: Dispatch<SetStateAction<number>> } & Partial<MetaType> & Children) {
  return (
    <InfiniteScroll
      next={() => setPage((prev) => prev + 1)}
      hasMore={meta?.hasNextPage ?? false}
      dataLength={meta?.itemCount ?? 0}
      style={{ overflow: "visible" }}
      loader={
        <div className="flex justify-center pt-6">
          <Spinner />
        </div>
      }
    >
      {children}
    </InfiniteScroll>
  );
}
