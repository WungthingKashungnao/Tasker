import prisma from "@/app/(components)/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// function to create post start
export const POST = async (req: Request) => {
  try {
    const { userId } = auth(); //getting userid from clerk
    if (!userId) {
      return NextResponse.json({ error: "unauthorized", status: 401 });
    }

    // const { title, description, date, isCompleted, isImportant } =
    //   await req.json();

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        message: "missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        message: "Title length must be atleast 3 characters long",
        status: 400,
      });
    }

    // creating task
    const task = await prisma.task.create({
      //@ts-ignoreignore
      data: {
        title,
        description,
        date,
        //@ts-ignoreignore
        isCompleted: completed,
        //@ts-ignoreignore
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    // console.log("Error creating task!", error);
    return NextResponse.json({ Message: "Error creating task!", status: 500 });
  }
};
// function to create post end

// function to get tasks start
export const GET = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "unauthorized", status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    // console.log("Tasks:-", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error gettin tasks", error);
    return NextResponse.json({ Message: "Error getting tasks", status: 500 });
  }
};
// funtion to get tasks end

// function to update tasks start
export const PUT = (req: Request) => {
  try {
  } catch (error) {
    console.log("Error updating tasks", error);
    return NextResponse.json({ Message: "Error Updating tasks", status: 500 });
  }
};
// function to update tasks end

// function to delete tasks start
export const DELETE = async (req: Request) => {
  try {
  } catch (error) {
    console.log("Error deleting tasks", error);
    return NextResponse.json({ Message: "Error deleting task", status: 500 });
  }
};
// function to delete tasks end
