import prisma from "@/app/(components)/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { id } = params; //recieving the id from the client
    if (!userId) {
      return NextResponse.json({ error: "unauthorized", status: 401 });
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Succesfully deleted user: ",
      user: task,
    });
  } catch (error) {
    console.log("Error Deleting Task: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();
    const { id } = params;
    const { isCompleted } = await req.json();
    if (!userId) {
      return NextResponse.json({ message: "Unatuthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Updating Task", error);
    return NextResponse.json({
      message: `Error updating Task`,
      status: 500,
    });
  }
};
