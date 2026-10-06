import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow | Professional Task Management System",
  description: "A professional, full-stack task management application with dark blue and white theme",
};

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0a192f] border-b border-[#1e293b] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo Icon & Logo Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-900/30 group-hover:from-blue-400 group-hover:to-blue-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-200 transition">
                  TaskFlow
                </span>
                <span className="rounded bg-blue-950/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300 border border-blue-800/60">
                  Pro
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 hidden sm:block">
                Task Management System
              </span>
            </div>
          </Link>

          {/* Right: Navigation Bar (Home & Tasks) */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/tasks"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#0a192f] shadow-sm transition hover:bg-slate-100"
            >
              <span>Tasks</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#0a192f] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white font-bold text-xs">
                TF
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                TaskFlow Management
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A high-performance full-stack task management system engineered with
              Next.js, Prisma, and PostgreSQL in professional dark blue & white theme.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-800/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Operational
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/tasks" className="text-slate-400 hover:text-white transition">
                  Task Board
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Stack
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-blue-400 font-semibold">•</span> Next.js App Router
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-blue-400 font-semibold">•</span> Prisma & PostgreSQL
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1e293b] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} TaskFlow. Professional White & Dark Blue Theme.
          </p>
          <div className="flex items-center gap-6">
            <span>Fast</span>
            <span>Reliable</span>
            <span>Organized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-900 selection:text-white">
        <AppHeader />
        <div className="flex-1">{children}</div>
        <AppFooter />
      </body>
    </html>
  );
}