import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connect();

    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
          message: "Invalid password",
        },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const loginResponse = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    loginResponse.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });
    return loginResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
