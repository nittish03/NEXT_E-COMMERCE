
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDb from "@/mongoDb/connectDb";
import NonVerifiedUser from "@/models/nonVerifiedUserSchema"
export async function POST(request: Request) {
    connectDb();
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
        return NextResponse.json("Missing value email or otp", {
            status: 422
        })
    }

    const nonVerifiedUser = await NonVerifiedUser.findOne({ email: email});


    if (!nonVerifiedUser) {
        return NextResponse.json("User does not exist", {
            status: 400
        })
    }  else if (nonVerifiedUser.otp !== parseInt(otp)) {
        return NextResponse.json("Invalid OTP", {
            status: 402
        })
    }else if (!nonVerifiedUser.otpExpiry || nonVerifiedUser.otpExpiry.getTime() < Date.now()) {
        return NextResponse.json("OTP has expired, click on resend OTP", {
            status: 401
        });
    }
     else {
        const newUser = new User({
            name: nonVerifiedUser.name,
            email: nonVerifiedUser.email,
            hashedPassword: nonVerifiedUser.hashedPassword
        });
        await newUser.save();
        
        await NonVerifiedUser.findByIdAndDelete(nonVerifiedUser.id);
        return NextResponse.json("OTP verified", {
            status: 200
        })
    }
}