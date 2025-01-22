"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

const PaginationItems = ({
  numOfProducts,
  perPage,
}: {
  numOfProducts: number;
  perPage: number | undefined;
}) => {
  if (typeof window !== "undefined") {
    const pathName = usePathname();
    const { replace } = useRouter();

    const getSearchParams = () => new URLSearchParams(window.location.search);

    let page = getSearchParams().get("page")
      ? +getSearchParams().get("page")!
      : 1;

    const createPageUrl = (pageNumber: number) => {
      const params = getSearchParams();
      params.set("page", pageNumber.toString());
      replace(`${pathName}?${params.toString()}`);
    };

    let totalPages = perPage ? Math.ceil(numOfProducts / perPage) : 0;

    return (
      <div className="flex gap-3 justify-center items-center mt-10">
        <button
          onClick={() => createPageUrl(page - 1)}
          disabled={page <= 1}
          className="text-bgLight-200 hover:scale-125 transition-all duration-300 disabled:opacity-20 disabled:scale-100"
        >
          <ChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            disabled={page === i + 1}
            onClick={() => createPageUrl(i + 1)}
            className={`bg-bgLight-200 main-transition ring-1 text-white ring-bgLight-200 cursor-pointer w-[30px] h-[30px] rounded-md flex items-center justify-center
              disabled:bg-white dark:disabled:bg-bgDark-400 disabled:text-bgLight-200 disabled:cursor-not-allowed
            `}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => createPageUrl(page + 1)}
          disabled={page >= totalPages}
          className="text-bgLight-200 hover:scale-125 transition-all duration-300 disabled:opacity-20 disabled:scale-100"
        >
          <ChevronRight />
        </button>
      </div>
    );
  }
  return <></>;
};

export default PaginationItems;
