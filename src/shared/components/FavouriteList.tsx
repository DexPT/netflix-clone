import { useEffect } from "react";
import Movies from "./Movies";
import useUser from "@/stores/users.store";

const FavouriteList = () => {
  const { favorites, updateFavorites } = useUser();

  useEffect(() => {
    updateFavorites();
  }, [updateFavorites]);

  return (
    <div className="pb-16">
      <Movies movies={favorites} label="My List" />
    </div>
  );
};

export default FavouriteList;
