import connectDb from "@/mongoDb/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";
import User from "@/models/userModel";

export async function POST(req) {
    try {
        const data = await req.json();
        const { newName } = data;

        // Log the newName to ensure it's received correctly
        console.log("New name to update:", newName);

        const session = await getServerSession(AuthOptions);
        const { email } = session.user;

        console.log("User email:", email);

        await connectDb();

        // Update the name field with the correct value
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { name: newName }, // Using trim() to clean up any extra spaces
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({
                message: "User not found",
                error: "User with this email does not exist",
            }, { status: 404 });
        }

        console.log("Updated user:", updatedUser);

        return NextResponse.json({
            message: "User updated successfully",
            user: updatedUser,
            newName: updatedUser.name,
        });

    } catch (e) {
        console.log("Error:", e);
        return NextResponse.json({
            message: "Something went wrong while changing name",
            error: e.message,
        }, { status: 500 });
    }
}

