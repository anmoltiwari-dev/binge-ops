import next from "next";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "./_components/MovieCard";

export default async function Home() {
  const configUrl = "https://api.themoviedb.org/3/configuration";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODZjZGMyMDRmNDM4YjdkMGRkZTkwNTA1NmQxYmM4OCIsIm5iZiI6MTc2MDAyNDk3OS4xNjYwMDAxLCJzdWIiOiI2OGU3ZDk5MzhiNDQwNGU0NWUzMGJmMDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xm6ko66ZkeZ2b39UW40vGywJMtY1ryPEcd6JgUAh1iM",
    },
  };
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  let configData;
  let movieData = [];
  try {
    const configApi = await fetch(configUrl, options);
    configData = await configApi.json();
    const movieApi = await fetch(url, options);
    movieData = await movieApi.json();
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return <div>Error loading movies</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movieData.results.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          src={`${configData.images.secure_base_url}${configData.images.poster_sizes[6]}${movie.poster_path}`}
        />
      ))}
    </div>
  );
}
