"use client";
import Billboard from "@/shared/components/Billboard";
import FavouriteList from "@/shared/components/FavouriteList";
import MovieList from "@/shared/components/MovieList";
import Navbar from "@/shared/components/Navbar";
import useUser from "@/stores/users.store";
import { useEffect } from "react";

export default function Home() {
  const { updateUser } = useUser();

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Billboard />
      <MovieList />
      <FavouriteList />
    </div>
  );
}
