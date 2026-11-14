'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  ariaLabel?: string;
}

export function Pagination({
  totalPages,
  currentPage,
  ariaLabel = 'Pagination',
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Hide pagination if there is only 1 page (or 0)
  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    replace(createPageURL(newPage));
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="flex items-center justify-between border-t border-slate-200 pt-6"
    >
      <p className="text-sm text-slate-600" aria-live="polite">
        Page <span className="font-medium text-slate-900">{currentPage}</span> of{' '}
        <span className="font-medium text-slate-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
