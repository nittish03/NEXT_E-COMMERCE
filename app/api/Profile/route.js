import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prismaDB } from "@/lib/prismaDB";

export async function POST(req) {
  try {
    const data = await req.json();
    const { newName } = data;

    if (typeof newName !== 'string' || !newName.trim()) {
        return NextResponse.json({ message: "Invalid name" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { email } = session.user;

    const updatedUser = await prismaDB.user.update({
      where: { email: email },
      data: { name: newName },
    });

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: "User not found",
          error: "User with this email does not exist",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
      newName: updatedUser.name,
    });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json(
      {
        message: "Something went wrong while changing name",
        error: e.message,
      },
      { status: 500 }
    );
  }
}
