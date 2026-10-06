"use client";

import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
  onCreate?: () => void;
};

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onCreate,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-xs">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 mb-4">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#0a192f]">No tasks found</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          No tasks match your current criteria, or your task board is empty.
          Get started by creating a new task.
        </p>
        {onCreate && (
          <button
            onClick={onCreate}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create First Task</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}