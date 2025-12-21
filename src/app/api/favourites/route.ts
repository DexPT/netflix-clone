import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    await connectToDB();

    const user = await User.findOne({ email: currentUser.email }).populate(
      "favourites"
    );

    return NextResponse.json({ favourites: user.favourites }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
