import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie, src }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={src}
          alt={movie.original_title}
          height={180}
          width={80}
          className="w-full object-cover object-center"
        />
        <p className="text-center">{movie.original_title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
