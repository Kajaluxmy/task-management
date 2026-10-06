import { NextRequest, NextResponse } from "next/server";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().refine(
    (value) => !Number.isNaN(Date.parse(value)),
    {
      message: "Invalid date",
    }
  ),
});

function getId(id: string) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const taskId = getId(id);

    if (!taskId) {
      return NextResponse.json(
        {
          message: "Invalid task ID",
        },
        {
          status: 400,
        }
      );
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      task,
    });
  } catch (error) {
    console.error("GET /api/tasks/[id] error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const taskId = getId(id);

    if (!taskId) {
      return NextResponse.json(
        {
          message: "Invalid task ID",
        },
        {
          status: 400,
        }
      );
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const result = taskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = result.data;

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status: status as TaskStatus,
        priority: priority as TaskPriority,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error);

    return NextResponse.json(
      {
        message: "Failed to update task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const taskId = getId(id);

    if (!taskId) {
      return NextResponse.json(
        {
          message: "Invalid task ID",
        },
        {
          status: 400,
        }
      );
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete task",
      },
      {
        status: 500,
      }
    );
  }
}