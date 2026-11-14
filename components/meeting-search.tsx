'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedTerm = term.trim();

    params.set('page', '1');

    if (trimmedTerm) {
      params.set('query', trimmedTerm);
    } else {
      params.delete('query');
    }

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search by speaker, leader, or meeting type..."
      defaultValue={searchParams.get('query') ?? ''}
      onChange={(e) => handleSearch(e.target.value)}
      aria-label="Search meetings"
      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
    />
  );
}
