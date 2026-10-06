import { NextRequest, NextResponse } from "next/server";
import { Prisma, TaskPriority, TaskStatus } from "@prisma/client";
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const pageParam = Number(searchParams.get("page") || "1");
    const limitParam = Number(searchParams.get("limit") || "10");

    const page = Number.isInteger(pageParam) && pageParam > 0
      ? pageParam
      : 1;

    const limit =
      Number.isInteger(limitParam) && limitParam > 0 && limitParam <= 100
        ? limitParam
        : 10;

    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search")?.trim();

    const where: Prisma.TaskWhereInput = {};

    if (
      status &&
      ["TODO", "IN_PROGRESS", "COMPLETED"].includes(status)
    ) {
      where.status = status as TaskStatus;
    }

    if (
      priority &&
      ["LOW", "MEDIUM", "HIGH"].includes(priority)
    ) {
      where.priority = priority as TaskPriority;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const skip = (page - 1) * limit;

    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.task.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    return NextResponse.json({
      tasks,
      pagination: {
        currentPage: page,
        totalTasks,
        totalPages,
        limit,
      },
    });
  } catch (error) {
    console.error("GET /api/tasks error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch tasks",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status as TaskStatus,
        priority: priority as TaskPriority,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/tasks error:", error);

    return NextResponse.json(
      {
        message: "Failed to create task",
      },
      {
        status: 500,
      }
    );
  }
}