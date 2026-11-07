export default function MeetingsLoading() {
  // Create an array with 6 items to match the layout grid of your 6 mock meetings
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="space-y-8 font-sans w-full max-w-6xl mx-auto">
      
      {/* 1. Header Section Shimmer Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2 flex-1">
          {/* Title skeleton bar */}
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
          {/* Subtitle skeleton bar */}
          <div className="h-4 bg-slate-200 rounded-lg w-64 animate-pulse" />
        </div>
        {/* Action Button skeleton bar */}
        <div className="h-10 bg-slate-200 rounded-xl w-36 animate-pulse hidden sm:block" />
      </div>

      {/* 2. Grid Dashboard Section Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {skeletonCards.map((_, index) => (
          <div 
            key={index}
            className="bg-white border border-slate-200/60 rounded-2xl p-6 h-[190px] flex flex-col justify-between shadow-sm select-none"
          >
            <div className="space-y-4 w-full">
              {/* Top Row: Tag badge skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded-full w-16 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md w-20 animate-pulse" />
              </div>

              {/* Middle Row: Content metadata strings */}
              <div className="space-y-2">
                {/* Date Heading skeleton */}
                <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
                {/* Executive conducting string skeleton */}
                <div className="h-4 bg-slate-200 rounded-md w-1/2 animate-pulse" />
                {/* Opening hymn line skeleton */}
                <div className="h-3 bg-slate-100 rounded-md w-2/3 animate-pulse" />
              </div>
            </div>

            {/* Bottom Row: Inline button card triggers */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
              <div className="h-8 bg-slate-200 rounded-lg flex-1 animate-pulse" />
              <div className="h-8 bg-slate-200 rounded-lg w-10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
