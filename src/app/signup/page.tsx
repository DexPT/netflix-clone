import { Input } from "@/shared/ui/Input";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center bg-black loginContainer">
      <div className="max-w-[480px] w-full bg-[#000000b3] rounded-sm py-12 px-16 font-bold text-[2rem] text-white flex flex-col gap-5 z-50">
        <h1>Sign Up</h1>
        <Input type="name" placeholder="Username" className="py-6 px-2" />
        <Input type="email" placeholder="Email" className="py-6 px-2" />
        <Input type="password" placeholder="Password" className="py-6 px-2" />
        <button className="cursor-pointer w-full bg-[#e50914] text-base font-medium rounded-lg py-2.5">
          Sign Up
        </button>
        <p className="text-base text-[#ffffffb3] text-center ">OR</p>
        <div className="flex items-center justify-center gap-4">
          <FcGoogle className="cursor-pointer w-10 h-10" />
          <BsGithub className="cursor-pointer w-10 h-10" />
        </div>
        <div>
          <span className="text-[#ffffffb3] text-base font-normal">
            Already have an account?{" "}
          </span>
          <Link href="/login" className="text-base font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
