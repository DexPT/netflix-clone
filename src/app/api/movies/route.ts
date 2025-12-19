import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/movie";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await serverAuth();

    await connectToDB();

    const movies = await Movie.find({});

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
