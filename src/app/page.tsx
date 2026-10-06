import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        {/* Subtle decorative background gradient accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-900/20 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-900 mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Enterprise-Grade Task Management
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0a192f] sm:text-6xl sm:leading-[1.15]">
              Organize, Prioritize & Execute Work with{" "}
              <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Confidence.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              A high-precision task management system designed with clean white
              and dark blue aesthetics. Seamlessly plan sprints, filter milestones,
              and maintain full control over your projects.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tasks"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a192f] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0a192f]/20 transition-all hover:bg-[#13284c] hover:shadow-xl active:scale-[0.99]"
              >
                <span>View Task Board</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                href="/tasks"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-[#0a192f] shadow-sm transition-all hover:border-blue-800 hover:bg-slate-50 hover:text-blue-900 active:scale-[0.99]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Browse Tasks</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Platform Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl">
              Engineered for productivity & reliability
            </p>
            <p className="mt-3 text-slate-600">
              Clean architecture paired with an intuitive white and deep navy interface.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Complete Lifecycle Management
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Easily transition tasks between To-Do, In-Progress, and Completed
                statuses with seamless server synchronization.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Instant Search & Multi-Filters
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Search task titles in real-time and filter dynamically by status and
                priority level without page reloads.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Due Date Deadlines
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Never miss a critical delivery. Clearly visible formatted dates keep
                deadlines top of mind for all team objectives.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Priority-Based Triage
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Tag items with High, Medium, or Low priority badges to ensure urgent
                deliverables are handled first.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Scalable Pagination
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Organized page browsing ensures swift render speeds even as task
                volumes expand into hundreds of entries.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 group-hover:bg-[#0a192f] group-hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0a192f]">
                Enterprise Security & Zod Validation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Strict input schema validation with Zod and resilient PostgreSQL
                persistence via Prisma ORM.
              </p>
            </div>
          </div>

          {/* Dark Blue CTA Banner */}
          <div className="mt-16 rounded-3xl bg-[#0a192f] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Ready to manage your workflow?
                </h3>
                <p className="mt-2 text-slate-300 max-w-xl">
                  Dive into your task board, create assignments, and start boosting
                  daily operational clarity immediately.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tasks"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-500 transition"
                >
                  Open Tasks Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}