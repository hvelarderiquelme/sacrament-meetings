export function MeetingsGridSkeleton() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200/60 rounded-2xl p-6 h-[190px] flex flex-col justify-between shadow-sm select-none"
        >
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center">
              <div className="h-5 bg-slate-200 rounded-full w-16 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded-md w-20 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded-md w-1/2 animate-pulse" />
              <div className="h-3 bg-slate-100 rounded-md w-2/3 animate-pulse" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
            <div className="h-8 bg-slate-200 rounded-lg flex-1 animate-pulse" />
            <div className="h-8 bg-slate-200 rounded-lg w-10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
