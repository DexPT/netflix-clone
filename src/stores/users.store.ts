import { IMovie } from "@/types/movie.types";
import { User } from "@/types/user.types";
import axios from "axios";
import { create } from "zustand";

type IState = {
  user: User | null;
  favorites: IMovie[];
};

type IActions = {
  updateUser: () => void;
  updateFavorites: () => void;
};

type IUserStoreState = IState & IActions;

const useUser = create<IUserStoreState>((set) => ({
  user: null,
  favorites: [],
  updateUser: async () => {
    const { data } = await axios.get("/api/me");
    const { currentUser } = data;
    set({ user: currentUser });
  },
  updateFavorites: async () => {
    const { data } = await axios.get("/api/favourites");
    set({ favorites: data.favourites });
  },
}));

export default useUser;
