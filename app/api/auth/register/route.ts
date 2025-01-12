import connectDb from "@/mongoDb/connectDb";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from '../../../../models/userModel'  
import NonVerifiedUser from "@/models/nonVerifiedUserSchema";
import { OTPHandler } from "@/lib/sendEmail";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if email already exists
    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate OTP
    const otpClient = new OTPHandler(email);
    const otp = otpClient.getOTP();
    const otpExpiry = new Date(Date.now() + 60 * 1000);

    // Save user in the database
    const user = await NonVerifiedUser.findOneAndUpdate(
      { email },
      { 
        name: username || null, 
        email, 
        hashedPassword, 
        otp, 
        otpExpiry 
      },
      { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // Send OTP
    otpClient.sendOTP();

    return NextResponse.json({
      message: "OTP sent, check your email",
      success: true
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
