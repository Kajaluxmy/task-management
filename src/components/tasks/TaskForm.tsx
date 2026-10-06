"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TaskFormProps = {
  taskId?: number;
  initialData?: {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function TaskForm({
  taskId,
  initialData,
  onSuccess,
  onCancel,
}: TaskFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "COMPLETED">(
    initialData?.status ?? "TODO"
  );
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    initialData?.priority ?? "MEDIUM"
  );
  const [dueDate, setDueDate] = useState(() => {
    if (initialData?.dueDate) {
      return new Date(initialData.dueDate).toISOString().split("T")[0];
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate,
      };

      const response = await fetch(
        taskId ? `/api/tasks/${taskId}` : "/api/tasks",
        {
          method: taskId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save task details");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/tasks");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/tasks");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm"
    >
      {/* Top dark blue accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0a192f]" />

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <svg
            className="h-5 w-5 shrink-0 text-rose-600 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <strong className="font-semibold">Error saving task:</strong>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#0a192f]">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Design enterprise navigation interface"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15"
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">
            A clear and descriptive title for this task.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#0a192f]">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Detail the scope, deliverables, and acceptance criteria..."
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a192f] placeholder-slate-400 outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15"
            required
          />
        </div>

        {/* Status & Priority Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#0a192f]">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as "TODO" | "IN_PROGRESS" | "COMPLETED"
                  )
                }
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a192f] outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15 cursor-pointer"
              >
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

          {/* Priority */}
          <div>
            <label className="mb-2 block text-sm font-bold text-[#0a192f]">
              Priority
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as "LOW" | "MEDIUM" | "HIGH"
                  )
                }
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a192f] outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15 cursor-pointer"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
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

        {/* Due Date */}
        <div>
          <label className="mb-2 block text-sm font-bold text-[#0a192f]">
            Due Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a192f] outline-none transition focus:border-blue-900 focus:ring-3 focus:ring-blue-900/15"
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:border-slate-400"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a192f] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-900/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4 text-blue-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{taskId ? "Update Task" : "Create Task"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}