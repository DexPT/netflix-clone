"use client";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NetflixGPTModal from "./NetflixGPTModal";

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNetflixGPTModalOpen, setIsNetflixGPTModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 w-full flex justify-between px-12 py-4 bg-transparent transition-colors duration-1000 z-50",
          isScrolled && "bg-black"
        )}
      >
        <div className="flex gap-8 items-center">
          <h1 className="text-[#e50914] cursor-pointer text-[25px]">Netflix</h1>
          <ul className="flex text-sm gap-5">
            <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">
              Home
            </li>
            <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">
              Shows
            </li>
            <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">
              Movies
            </li>
            <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">
              Games
            </li>
          </ul>
        </div>
        <div className="flex gap-[15px] items-center">
          <button
            className="cursor-pointer"
            onClick={() => setIsNetflixGPTModalOpen(true)}
          >
            <Sparkle className="text-white" />
          </button>
          {/*    <Image
            src="/assets/search.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            alt="Search"
          />
          <Image
            src="/assets/notification.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            alt="Notification"
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white cursor-pointer">
                <Image
                  src="/assets/profile.png"
                  height={32}
                  width={32}
                  alt="Profile Picture"
                  className="rounded-[4px]"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#000000e6] text-white border-none w-[200px]">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Image
                    src="/assets/profile.png"
                    height={32}
                    width={32}
                    alt="Profile Picture"
                    className="rounded-[4px]"
                  />
                  <span>{session?.user?.name}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#ffffff40]" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-[13px] px-2.5 py-2 flex justify-between"
                  onClick={() => signOut()}
                >
                  Sign out of Netflix
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isNetflixGPTModalOpen ? (
        <NetflixGPTModal
          isNetflixGPTModalOpen={isNetflixGPTModalOpen}
          setIsNetflixGPTModalOpen={setIsNetflixGPTModalOpen}
        />
      ) : null}
    </>
  );
};

export default Navbar;
