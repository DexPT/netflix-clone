import useUser from "@/stores/users.store";
import { IMovie } from "@/types/movie.types";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const MoviePopup = ({
  movie,
  handleOpenInfoModal,
}: {
  movie: IMovie;
  handleOpenInfoModal: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { user, updateUser, updateFavorites } = useUser();

  const isFavourite = useMemo(() => {
    return user?.favorites?.includes(movie._id);
  }, [user, movie]);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      setIsVideoPlaying(true);
      videoRef.current.play();
      videoRef.current.requestFullscreen();
    }
  };

  const toggleFavourites = async (movieId: string) => {
    try {
      if (isFavourite) {
        await axios.delete("/api/favourite", {
          data: { movieId },
        });
      } else {
        await axios.post("/api/favourite", { movieId });
      }

      updateUser();
      updateFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsVideoPlaying(false);
        videoRef.current = null;
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="absolute -left-8 w-80 z-10 -top-16 rounded-md text-base transform scale-75 hover:scale-100 hover:-translate-y-6 transition-transform duration-300 ease-in-out">
      <video
        ref={videoRef}
        src={movie.videoUrl}
        poster={movie.thumbnailUrl}
        className={clsx({ hidden: !isVideoPlaying })}
      />
      <div className="relative w-80 h-[140px]">
        <Image
          className="object-cover"
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
        />
      </div>
      <div className="bg-[#181818] p-4">
        <div className="flex justify-between mb-2 items-center">
          <div className="flex gap-2 items-center">
            <button
              className="bg-white border-2 rounded-full p-2 border-[#ffffff80] cursor-pointer"
              onClick={handlePlayButtonClick}
            >
              <Image src="/assets/play.svg" width={20} height={20} alt="Play" />
            </button>
            <button
              className="bg-[#2a2a2a] border-2 rounded-full p-2 border-[#ffffff80] cursor-pointer"
              onClick={() => toggleFavourites(movie._id)}
            >
              <Image
                src={`/assets/${isFavourite ? "white-tick" : "plus"}.svg`}
                width={20}
                height={20}
                alt="Add"
              />
            </button>
          </div>
          <button
            className="cursor-pointer bg-[#2a2a29] border-2 border-[#ffffff80] p-2 rounded-full hover:bg-[#ffffff1a] hover:border-white"
            onClick={handleOpenInfoModal}
          >
            <Image
              src="/assets/down-arrow.svg"
              width={24}
              height={24}
              alt="Show movie details"
            />
          </button>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <span className="px-2 uppercase whitespace-nowrap text-[#bcbcbc] text-sm font-medium border border-[#fff6]">
            U/A 13+
          </span>
          <span className="text-[#bcbcbc] text-base">{movie.duration}</span>
          <span className="text-[#bcbcbc] border border-[#fff6] rounded-[3px] text-xs px-1.5">
            HD
          </span>
        </div>

        <p className="textShadow text-base text-white mt-3 ">{movie.genre}</p>
      </div>
    </div>
  );
};

export default MoviePopup;
