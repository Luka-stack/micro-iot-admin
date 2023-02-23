'use client';

import { usePagination } from '@/hooks/use-pagination';
import { Pagination } from '@/types';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

type Props = {
  pagination: Pagination;
  loading: boolean;
  changePage: (paginationUrl: string) => void;
};

export const BasePagination = ({ pagination, loading, changePage }: Props) => {
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

    const url = `limit=${pagination.limit}&offset=${
      (pageNumber - 1) * pagination.limit
    }`;

    changePage(url);
  };

  if (paginationRange.length === 1) {
    return null;
  }

  return (
    <ul
      className={clsx(
        'flex items-center justify-end flex-none h-full pt-4 space-x-2 text-sm',
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
                'flex items-center justify-center px-3 py-1 space-x-2 bg-blue-900 rounded-md shadow-md text-slate-200 hover:bg-blue-800 shadow-black',
                currentPage === pageNumber && 'bg-blue-700 hover:bg-blue-700'
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
  );
};
