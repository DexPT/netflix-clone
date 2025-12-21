import Billboard from "@/shared/components/Billboard";
import MovieList from "@/shared/components/MovieList";
import Navbar from "@/shared/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Billboard />
      <MovieList />
    </div>
  );
}
