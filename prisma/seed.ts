import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: [
      {
        title: "Complete Website",
        description: "Finish the company website",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-10-15"),
      },
      {
        title: "Design Login Page",
        description: "Create the login page UI",
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-10-08"),
      },
      {
        title: "Create Dashboard",
        description: "Build the main dashboard",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-10-20"),
      },
      {
        title: "Fix Authentication",
        description: "Resolve authentication issues",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-10-10"),
      },
      {
        title: "Write Documentation",
        description: "Prepare project documentation",
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        dueDate: new Date("2026-10-25"),
      },
      {
        title: "Test API",
        description: "Test all REST API endpoints",
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-10-12"),
      },
      {
        title: "Implement Search",
        description: "Add task title search functionality",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-10-18"),
      },
      {
        title: "Add Pagination",
        description: "Implement pagination for tasks",
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date("2026-10-22"),
      },
      {
        title: "Mobile Responsive Design",
        description: "Improve UI for mobile devices",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-10-28"),
      },
      {
        title: "Deploy Application",
        description: "Deploy the application to production",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date("2026-11-01"),
      },
    ],
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });