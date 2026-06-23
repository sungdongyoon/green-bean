import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const TablePagination = ({ table }: { table: any }) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const visiblePages = Array.from(
    { length: pageCount },
    (_, index) => index,
  ).filter(
    (page) =>
      page === 0 || page === pageCount - 1 || Math.abs(page - pageIndex) <= 1,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!table.getCanPreviousPage()}
            className={
              !table.getCanPreviousPage()
                ? "pointer-events-none opacity-50"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              table.previousPage();
            }}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap = previousPage !== undefined && page - previousPage > 1;

          return (
            <React.Fragment key={page}>
              {hasGap && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={page === pageIndex}
                  onClick={(event) => {
                    event.preventDefault();
                    table.setPageIndex(page);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            </React.Fragment>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={!table.getCanNextPage()}
            className={
              !table.getCanNextPage() ? "pointer-events-none opacity-50" : ""
            }
            onClick={(event) => {
              event.preventDefault();
              table.nextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
