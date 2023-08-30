'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

import { Pagination } from '@/types';
import { usePagination } from '@/hooks/use-pagination';
import { createPaginationUrl } from '@/common/helpers';

type Props = {
  loading: boolean;
  pagination: Pagination;
  changePage: (paginationUrl: string) => void;
};

export const BasePagination = ({ loading, pagination, changePage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const hasNext = useMemo(
    () => pagination.total > pagination.offset + pagination.count,
    [pagination]
  );

  const hasPrev = useMemo(() => pagination.offset > 0, [pagination]);

  const paginationRange = usePagination(
    pagination.total,
    pagination.limit,
    currentPage
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    changePage(createPaginationUrl(pageNumber, pagination.limit));
  };

  if (paginationRange.length === 1) {
    return null;
  }

  return (
    <div className="flex-none p-2">
      <ul
        className={clsx(
          'flex items-center justify-end flex-none h-full space-x-2 text-sm',
          loading && 'pointer-events-none'
        )}
      >
        {hasPrev ? (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="flex items-center justify-center px-3 py-1 space-x-2 bg-blue-900 rounded-md shadow-md text-slate-200 hover:bg-blue-800 shadow-black"
            >
              Prev
            </button>
          </li>
        ) : null}

        {paginationRange!.map((pageNumber, id) => {
          if (pageNumber === -1) {
            return <EllipsisHorizontalIcon key={`d-${id}`} className="h-5" />;
          }

          return (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                disabled={currentPage === pageNumber}
                className={clsx(
                  'flex items-center justify-center px-3 py-1 space-x-2 rounded-md shadow-md text-slate-200 hover:bg-blue-700 shadow-black',
                  currentPage === pageNumber ? 'bg-blue-700' : 'bg-blue-900'
                )}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {hasNext ? (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="flex items-center justify-center px-3 py-1 space-x-2 bg-blue-900 rounded-md shadow-md text-slate-200 hover:bg-blue-800 shadow-black"
            >
              Next
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};
