"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
};

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const [isOverdue, setIsOverdue] = useState(false);

  // Format due date cleanly
  const dueDateObj = new Date(task.dueDate);
  const formattedDate = dueDateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (task.status !== "COMPLETED") {
        const endOfDay = new Date(task.dueDate);
        endOfDay.setHours(23, 59, 59, 999);
        setIsOverdue(endOfDay.getTime() < Date.now());
      } else {
        setIsOverdue(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [task.dueDate, task.status]);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:border-blue-900/30 hover:shadow-md hover:-translate-y-0.5">
      {/* Top Header: Title & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link href={`/tasks/${task.id}`} className="group/link flex-1">
            <h2 className="text-lg font-bold text-[#0a192f] group-hover/link:text-blue-700 transition tracking-tight">
              {task.title}
            </h2>
          </Link>
          <span className="shrink-0 text-xs font-mono font-medium text-slate-400">
            #{task.id}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 mb-4">
          {task.description}
        </p>
      </div>

      {/* Meta details & Actions */}
      <div className="border-t border-slate-100 pt-4 mt-2">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Status badge */}
          {task.status === "TODO" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100/80 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              To Do
            </span>
          )}
          {task.status === "IN_PROGRESS" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-900">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              In Progress
            </span>
          )}
          {task.status === "COMPLETED" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
              <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </span>
          )}

          {/* Priority badge */}
          {task.priority === "HIGH" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800">
              <svg className="h-3 w-3 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
              High Priority
            </span>
          )}
          {task.priority === "MEDIUM" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
              <span className="h-2 w-2 rounded-xs bg-amber-500" />
              Medium Priority
            </span>
          )}
          {task.priority === "LOW" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
              <span className="h-2 w-2 rounded-xs bg-slate-400" />
              Low Priority
            </span>
          )}
        </div>

        {/* Due date row */}
        <div className="flex items-center justify-between text-xs mb-4">
          <div className="flex items-center gap-1.5 text-slate-500">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Due: <strong className="text-slate-700 font-medium">{formattedDate}</strong></span>
          </div>

          {isOverdue && (
            <span className="inline-flex items-center gap-1 font-semibold text-rose-600 text-[11px]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Overdue
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <Link
            href={`/tasks/${task.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0a192f]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#0a192f] transition hover:bg-[#0a192f] hover:text-white shadow-2xs"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Link>

          {onEdit ? (
            <button
              onClick={() => onEdit(task)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a192f] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#13284c] shadow-2xs"
            >
              <svg className="h-3.5 w-3.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          ) : (
            <Link
              href={`/tasks/${task.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a192f] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#13284c] shadow-2xs"
            >
              <svg className="h-3.5 w-3.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200/80 bg-rose-50/60 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 hover:border-rose-300 shadow-2xs"
          >
            <svg className="h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}