"use client";

type TaskFiltersProps = {
  search: string;
  status: string;
  priority: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onClearFilters?: () => void;
};

export default function TaskFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: TaskFiltersProps) {
  const hasActiveFilters = Boolean(search || status || priority);

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    } else {
      onSearchChange("");
      onStatusChange("");
      onPriorityChange("");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search Input */}
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>Search Tasks</span>
              {search && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="text-[11px] font-normal text-blue-800 hover:underline"
                >
                  Clear
                </button>
              )}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by task title..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-[#0a192f] placeholder-slate-400 outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(event) => onStatusChange(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-[#0a192f] outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15 cursor-pointer"
              >
                <option value="">All Statuses (Active & Done)</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Priority
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(event) => onPriorityChange(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-[#0a192f] outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15 cursor-pointer"
              >
                <option value="">All Priorities (Any Urgency)</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Filters bar if any active */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Active filter criteria applied
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="font-semibold text-blue-900 hover:text-blue-700 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}