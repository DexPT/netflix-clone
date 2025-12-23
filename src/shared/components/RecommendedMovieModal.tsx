import { IMovie, IRecommendedMovie } from "@/types/movie.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

interface IRecommendedMovieModalProps {
  isRecommendedMovieModalOpen: boolean;
  setIsRecommendedMovieModalOpen: (open: boolean) => void;
  recommendedMovie: IRecommendedMovie | null;
  movies: IMovie[];
}

const RecommendedMovieModal = ({
  isRecommendedMovieModalOpen,
  setIsRecommendedMovieModalOpen,
  recommendedMovie,
  movies,
}: IRecommendedMovieModalProps) => {
  const [isMoviePlaying, setIsMoviePlaying] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filterRecommendedMovie = movies.filter((movie) => {
    return recommendedMovie?.recommendation.some(
      (recommendation) => recommendation._id === movie._id
    );
  });

  const handlePlayMovie = async (recommendedMovie: IMovie) => {
    if (videoRef.current) {
      videoRef.current.src = recommendedMovie.videoUrl;
      videoRef.current.poster = recommendedMovie.thumbnailUrl;
      await videoRef.current.play();
      setIsMoviePlaying(true);
      videoRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsMoviePlaying(false);
        videoRef.current?.pause();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <Dialog
      open={isRecommendedMovieModalOpen}
      onOpenChange={() => setIsRecommendedMovieModalOpen(false)}
    >
      <DialogContent className="min-w-[850px] px-12 py-8 bg-[#181818] border-none">
        <DialogHeader className="flex gap-0">
          <DialogTitle className="mb-4 text-2xl font-medium text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Recommended Movies
          </DialogTitle>
          <DialogDescription className=" text-[#999999]">
            {recommendedMovie?.reason}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <video ref={videoRef} className={clsx({ hidden: !isMoviePlaying })} />
          {filterRecommendedMovie.map((recommendedMovie, index) => (
            <div
              key={recommendedMovie._id}
              className="flex gap-3.5 border-b border-[#404040] rounded-sm p-8 items-center cursor-pointer"
              onMouseEnter={() => setSelectedMovie(recommendedMovie)}
              onMouseLeave={() => setSelectedMovie(null)}
              onClick={() => handlePlayMovie(recommendedMovie)}
            >
              <div className="text-[#d2d2d2] text-2xl">{index + 1}</div>
              <div className="relative cursor-pointer">
                {selectedMovie?._id === recommendedMovie._id ? (
                  <div className="playIcon absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#1e1e1480] border border-white rounded-4xl h-12 p-2 w-12 flex items-center justify-center">
                      <Image
                        src="/assets/play-medium.svg"
                        width={30}
                        height={30}
                        alt="Play movie"
                      />
                    </div>
                  </div>
                ) : null}
                <Image
                  className="object-cover rounded-sm min-w-[130px] max-h-[74px]"
                  src={recommendedMovie.thumbnailUrl}
                  width={130}
                  height={74}
                  alt={recommendedMovie.title}
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">
                    {recommendedMovie.title}
                  </span>
                  <span className="text-white text-base">
                    {recommendedMovie.duration}
                  </span>
                </div>
                <p className="mt-2 text-[#d2d2d2] text-sm">
                  {recommendedMovie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendedMovieModal;
