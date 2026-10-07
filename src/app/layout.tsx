import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavLinks from "./nav-links";

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
              </div>
              <span className="text-[11px] font-medium text-slate-400 hidden sm:block">
                Task Management System
              </span>
            </div>
          </Link>

          {/* Right: Navigation Bar (Home & Tasks) */}
          <NavLinks />
        </div>
      </div>
    </header>
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
      </body>
    </html>
  );
}