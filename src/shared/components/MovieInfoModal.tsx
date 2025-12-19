import { useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/Dialog";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import { Dot } from "lucide-react";

interface ImovieInfoModalProps {
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
  movieData: IMovie | null;
}

const MovieInfoModal = ({
  showInfoModal,
  setShowInfoModal,
  movieData,
}: ImovieInfoModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };
  return (
    <Dialog open={showInfoModal} onOpenChange={() => setShowInfoModal(false)}>
      <DialogTitle></DialogTitle>
      <DialogContent className="bg-[#181818] border-none min-w-[700px] p-0">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative">
            <video
              ref={videoRef}
              src={movieData?.videoUrl}
              poster={movieData?.thumbnailUrl}
              className="w-full h-[350px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute bottom-4 left-6 flex flex-col gap-5 items-center">
              <h1 className="text-4xl text-white font-bold self-start">
                {movieData?.title}
              </h1>
              <div className="flex self-start gap-3">
                <button
                  className="flex gap-2 bg-white p-2 px-3.5 rounded-sm self-start cursor-pointer font-bold"
                  onClick={handlePlayButtonClick}
                >
                  <Image
                    src="/assets/play.svg"
                    width={20}
                    height={20}
                    alt="Play"
                  />
                  Play
                </button>
                <button className="bg-transparent border-2 rounded-full p-2 border-white cursor-pointer">
                  <Image
                    src="/assets/plus.svg"
                    width={20}
                    height={20}
                    alt="Add"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 p-10">
            <div className="flex gap-2 items-center">
              <span className="px-2 uppercase whitespace-nowrap text-[#bcbcbc] text-sm font-medium border border-[#fff6]">
                U/A 13+
              </span>
              <span className="text-[#bcbcbc] text-base">
                {movieData?.duration}
              </span>
              <span className="text-[#bcbcbc] border border-[#fff6] rounded-[3px] text-xs px-1.5">
                HD
              </span>
            </div>
            <p className="text-base leading-[26px] text-white">
              {movieData?.description}
            </p>
            <div className="flex">
              <p className="textShadow text-base text-white">
                {movieData?.genre}
              </p>
              <Dot className="text-[#646464]" />
              <p className="textShadow text-base text-white">
                {movieData?.mood}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieInfoModal;
