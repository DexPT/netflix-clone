import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { connectToDB } from "./db";

const serverAuth = async () => {
  await connectToDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }

    await connectToDB();
    const currentUser = await User.findOne({ email: session.user?.email });

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    return { currentUser };
  } catch {
    throw new Error("Unauthorized");
  }
};

export default serverAuth;
