"use client";

import { IMovie } from "@/types/movie.types";
import axios from "axios";
import { useEffect, useState } from "react";
import Movies from "./Movies";

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/movies");
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <Movies movies={movies} label="Top Movies" />;
};

export default MovieList;
