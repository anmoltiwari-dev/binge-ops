import Image from "next/image";
import Link from "next/link";
import AddMovieToWatchList from "@/app/_components/AddMovieToWatchList";

const MovieCard = ({ movie, src }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="flex flex-col gap-2 items-center">
        <div className="relative w-full">
          <Image
            src={src}
            alt={movie.original_title}
            height={180}
            width={80}
            className="w-full object-cover object-center"
          />
          <AddMovieToWatchList movie={movie} />
        </div>
        <p className="text-center">{movie.original_title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
