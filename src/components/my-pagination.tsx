import { Pagination } from "@nextui-org/react";
import { MetaType } from "#/entities";
import { useCurrentPage } from "#/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function MyPagination({ meta }: MetaType) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = useCurrentPage();

  useEffect(() => {
    if (currentPage > meta.pageCount) {
      router.push(pathname);
    }
  }, [currentPage, meta]);

  return (
    meta.pageCount > 1 && (
      <Pagination
        showControls
        page={currentPage}
        onChange={(inlinePage) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", inlinePage.toString());
          router.push(inlinePage === 1 ? pathname : pathname + "?" + params.toString());
        }}
        classNames={{ wrapper: "mx-auto" }}
        total={meta.pageCount}
      />
    )
  );
}
