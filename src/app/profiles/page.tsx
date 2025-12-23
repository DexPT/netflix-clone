"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profiles = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/");
  };
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-8">
      <h1 className="text-white text-[50.4px]">Who&apos;s watching</h1>
      <div className="flex flex-col gap-3">
        <div
          className="border-[3.24px] border-[#e5e5e5] rounded-sm overflow-hidden cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src="/assets/profile.png"
            height={144}
            width={144}
            alt="Profile Picture"
          />
        </div>
        <h3 className="text-[#e5e5e5] text-[18.72px] text-center">
          {session?.user?.name || "Loading..."}
        </h3>
      </div>
    </div>
  );
};

export default Profiles;
