"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
};

type Pagination = {
  currentPage: number;
  totalTasks: number;
  totalPages: number;
  limit: number;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalTasks: 0,
    totalPages: 1,
    limit: 6,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal states for Create & Edit
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", "6");

      if (search) {
        params.set("search", search);
      }

      if (status) {
        params.set("status", status);
      }

      if (priority) {
        params.set("priority", priority);
      }

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, priority]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      const nextPage =
        tasks.length === 1 && pagination.currentPage > 1
          ? pagination.currentPage - 1
          : pagination.currentPage;
      fetchTasks(nextPage);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to delete task"
      );
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
  };

  const handleFormSuccess = () => {
    setIsCreateOpen(false);
    setEditingTask(null);
    fetchTasks(pagination.currentPage);
  };

  // Quick stats derived from currently loaded tasks
  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <main className="min-h-full bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-900 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Tasks</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0a192f] sm:text-4xl">
              Task Management Board
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage, search, organize, and monitor all your tasks with full visibility.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a192f] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#0a192f]/15 transition hover:bg-blue-950 hover:shadow-lg active:scale-[0.99] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create New Task</span>
          </button>
        </div>

        {/* Quick Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Found
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#0a192f]">
              {pagination.totalTasks}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              To Do (On Page)
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-700">
              {todoCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
              In Progress
            </p>
            <p className="mt-1 text-2xl font-extrabold text-blue-900">
              {inProgressCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Completed
            </p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-800">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-6">
          <TaskFilters
            search={search}
            status={status}
            priority={priority}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchTasks(pagination.currentPage)}
              className="font-bold underline hover:text-rose-900"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-10"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div className="h-4 bg-slate-200 rounded w-28"></div>
                  <div className="flex gap-2">
                    <div className="h-7 bg-slate-200 rounded w-14"></div>
                    <div className="h-7 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Task List */}
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onEdit={(task) => setEditingTask(task)}
              onCreate={() => setIsCreateOpen(true)}
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-6 py-4 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium">
                  Showing page <strong className="text-slate-800">{pagination.currentPage}</strong> of{" "}
                  <strong className="text-slate-800">{pagination.totalPages}</strong> ({pagination.totalTasks} tasks)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchTasks(pagination.currentPage - 1)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => fetchTasks(pageNum)}
                        className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                          pagination.currentPage === pageNum
                            ? "bg-[#0a192f] text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => fetchTasks(pagination.currentPage + 1)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal: Create Task */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/60 backdrop-blur-xs overflow-y-auto">
            <div className="w-full max-w-2xl my-8">
              <div className="mb-2 flex justify-between items-center px-1">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Create New Task
                </h3>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-lg p-1 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  aria-label="Close dialog"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskForm
                onSuccess={handleFormSuccess}
                onCancel={() => setIsCreateOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Modal: Edit Task */}
        {editingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/60 backdrop-blur-xs overflow-y-auto">
            <div className="w-full max-w-2xl my-8">
              <div className="mb-2 flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Edit Task
                  </h3>
                  <span className="rounded bg-blue-900 px-2 py-0.5 text-xs font-bold text-white">
                    #{editingTask.id}
                  </span>
                </div>
                <button
                  onClick={() => setEditingTask(null)}
                  className="rounded-lg p-1 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  aria-label="Close dialog"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskForm
                taskId={editingTask.id}
                initialData={editingTask}
                key={editingTask.id}
                onSuccess={handleFormSuccess}
                onCancel={() => setEditingTask(null)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}