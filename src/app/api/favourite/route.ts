import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/movie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    await connectToDB();

    const { movieId } = await req.json();
    const isMovieExist = await Movie.findById(movieId);

    if (!isMovieExist) {
      return NextResponse.json(
        { message: "Invalid movie id" },
        { status: 400 }
      );
    }

    await User.updateOne(
      { email: currentUser.email },
      { $addToSet: { favorites: movieId } }
    );

    return NextResponse.json(
      { message: "Movie added to favourites" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    await connectToDB();

    const { movieId } = await req.json();
    const isMovieExist = await Movie.findById(movieId);

    if (!isMovieExist) {
      return NextResponse.json(
        { message: "Invalid movie id" },
        { status: 400 }
      );
    }
    await User.updateOne(
      { email: currentUser.email },
      { $pull: { favorites: movieId } }
    );

    return NextResponse.json(
      { message: "Movie removed from favourites" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
