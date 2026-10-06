"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TaskForm from "@/components/tasks/TaskForm";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOverdue, setIsOverdue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch task details");
      }

      setTask(data.task);

      if (data.task.status !== "COMPLETED") {
        const endOfDay = new Date(data.task.dueDate);
        endOfDay.setHours(23, 59, 59, 999);
        setIsOverdue(endOfDay.getTime() < Date.now());
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load task"
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        fetchTask();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [id, fetchTask]);

  const handleDelete = async () => {
    if (!task) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      router.push("/tasks");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    fetchTask();
  };

  if (loading) {
    return (
      <main className="min-h-full bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-10 bg-slate-200 rounded w-1/2"></div>
            <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="h-12 bg-slate-200 rounded"></div>
                <div className="h-12 bg-slate-200 rounded"></div>
                <div className="h-12 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !task) {
    return (
      <main className="min-h-full bg-slate-50 py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-2xl border border-rose-200 bg-white p-8 shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 mb-4">
              <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#0a192f]">Task Not Found</h2>
            <p className="mt-2 text-sm text-slate-600">
              {error || "The requested task could not be found."}
            </p>
            <Link
              href="/tasks"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0a192f] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-900 transition"
            >
              Back to Task Board
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedCreated = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-full bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-900 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/tasks" className="hover:text-blue-900 transition">
            Tasks
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Task #{task.id}</span>
        </nav>

        {/* Back Link & Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 transition mb-3"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to All Tasks</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-900">
                Task #{task.id}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0a192f] sm:text-3xl">
                {task.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-950 cursor-pointer"
            >
              <svg
                className="h-3.5 w-3.5 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Edit Task</span>
            </button>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-2.5 text-xs font-semibold text-rose-700 shadow-2xs transition hover:bg-rose-100 cursor-pointer"
            >
              <svg
                className="h-3.5 w-3.5 text-rose-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Task Details Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          {/* Top dark blue accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0a192f]" />

          {/* Badges and Overview */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-slate-100">
            {/* Status badge */}
            {task.status === "TODO" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                To Do
              </span>
            )}
            {task.status === "IN_PROGRESS" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                In Progress
              </span>
            )}
            {task.status === "COMPLETED" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                <svg
                  className="h-3.5 w-3.5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed
              </span>
            )}

            {/* Priority badge */}
            {task.priority === "HIGH" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-800">
                <svg
                  className="h-3.5 w-3.5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
                High Priority
              </span>
            )}
            {task.priority === "MEDIUM" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                <span className="h-2 w-2 rounded-xs bg-amber-500" />
                Medium Priority
              </span>
            )}
            {task.priority === "LOW" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                <span className="h-2 w-2 rounded-xs bg-slate-400" />
                Low Priority
              </span>
            )}

            {isOverdue && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                <svg
                  className="h-3.5 w-3.5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Deadline Overdue
              </span>
            )}
          </div>

          {/* Description Section */}
          <div className="py-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Description & Acceptance Criteria
            </h2>
            <div className="rounded-xl bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap border border-slate-100">
              {task.description}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-slate-100">
            <div className="rounded-xl border border-slate-200/80 p-4 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Target Due Date
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0a192f]">
                <svg
                  className="h-4 w-4 text-blue-700"
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
                <span>{formattedDueDate}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 p-4 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Created On
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0a192f]">
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{formattedCreated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Edit Task on Detail Page */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/60 backdrop-blur-xs overflow-y-auto">
            <div className="w-full max-w-2xl my-8">
              <div className="mb-2 flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Edit Task
                  </h3>
                  <span className="rounded bg-blue-900 px-2 py-0.5 text-xs font-bold text-white">
                    #{task.id}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg p-1 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  aria-label="Close dialog"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskForm
                taskId={task.id}
                initialData={task}
                key={task.id}
                onSuccess={handleEditSuccess}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
