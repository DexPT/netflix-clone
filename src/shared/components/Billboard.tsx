"use client";
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MovieInfoModal from "./MovieInfoModal";

const Billboard = () => {
  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/movies");
      const randomNum = Math.floor(Math.random() * data.length);
      setRandomMovie(data[randomNum]);
    } catch (error) {
      console.log(error);
      console.log("API /movies error:", error);
    }
  };
  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleOpenInfoModal = () => {
    setShowInfoModal(true);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  /*   console.log("randomMovie: ", randomMovie);
   */
  return (
    <div className="h-screen relative ">
      <video
        src={randomMovie?.videoUrl}
        poster={randomMovie?.thumbnailUrl}
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-1/2 left-10 -translate-y-1/2 transform flex flex-col gap-4">
        <h1 className="text-5xl  text-white font-bold">{randomMovie?.title}</h1>
        <p className="text-white">{randomMovie?.description}</p>
        <div className="flex gap-2">
          <button
            className="text-lg font-semibold bg-white py-2 px-5 text-black rounded-sm cursor-pointer flex gap-4 hover:bg-[#ffffffbf]"
            onClick={handlePlayButtonClick}
          >
            <Image
              src="/assets/play.svg"
              width={24}
              height={24}
              alt="Play video"
            />
            Play
          </button>
          <button
            className="text-lg font-semibold bg-[#6d6d6eb3] py-2 px-5 text-white rounded-sm cursor-pointer flex gap-4 hover:bg-[#6d6d6e66]"
            onClick={handleOpenInfoModal}
          >
            <Image
              src="/assets/info.svg"
              width={24}
              height={24}
              alt="Play video"
            />
            More Info
          </button>
        </div>
      </div>
      {showInfoModal ? <MovieInfoModal /> : null}
    </div>
  );
};

export default Billboard;
