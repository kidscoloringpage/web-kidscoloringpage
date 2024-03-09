type Props = {
  currentPage: number;
  perPage: number;
  totalRecords: number;
};

export function Pagination(props: Props) {
  const { currentPage, perPage, totalRecords } = props;
  const lastPage = Math.ceil(totalRecords / perPage);

  if (!totalRecords) {
    return <div />;
  }

  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-y-2.5 md:flex-row">
      {currentPage - 1 !== 0 && (
        <a
          data-ga-category="PaginationClick"
          data-ga-action="PrevPageClick"
          data-ga-label="PrevPageClick"
          href={`?page=${currentPage - 1}`}
          className="button relative flex w-full flex-row items-center justify-center gap-x-4 md:w-fit md:min-w-[160px]"
        >
          <img
            src="/icon-angle-right.png"
            alt="icon-angle-right"
            className="absolute left-4 mt-[4px] h-auto w-[10px] rotate-180"
          />
          Prev
        </a>
      )}
      {currentPage - 1 === 0 && <span />}
      <p className="text-sm md:mt-4 md:text-base">
        {'Page ' + currentPage + ' of ' + lastPage}
      </p>
      {currentPage !== lastPage && (
        <a
          data-ga-category="PaginationClick"
          data-ga-action="NextPageClick"
          data-ga-label="NextPageClick"
          href={`?page=${currentPage + 1}`}
          className="button relative flex w-full flex-row items-center justify-center gap-x-4 md:w-fit md:min-w-[160px]"
        >
          Next
          <img
            src="/icon-angle-right.png"
            alt="icon-angle-right"
            className="absolute right-4 mt-[4px] h-auto w-[10px]"
          />
        </a>
      )}
      {currentPage === lastPage && <span />}
    </div>
  );
}
