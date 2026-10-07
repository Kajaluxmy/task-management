"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTasks = pathname?.startsWith("/tasks");

  return (
    <nav className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition ${
          isHome
            ? "bg-slate-200 text-[#0a192f]"
            : "bg-transparent text-white hover:bg-slate-100 hover:text-[#0a192f]"
        }`}
      >
        Home
      </Link>

      <Link
        href="/tasks"
        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition ${
          isTasks
            ? "bg-slate-200 text-[#0a192f]"
            : "bg-transparent text-white hover:bg-slate-100 hover:text-[#0a192f]"
        }`}
      >
        <span>Tasks</span>
      </Link>
    </nav>
  );
}
