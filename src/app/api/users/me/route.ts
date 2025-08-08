import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connect();

    // Get user ID from token
    const userId = getDataFromToken(request);
    console.log("User ID from token:", userId);

    // Find user in database
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.log("Error in /api/users/me:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
