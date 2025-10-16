import MovieCard from "@/app/_components/MovieCard";
import RedirectButton from "@/app/_components/RedirectButton";
import AddMovieToWatchList from "@/app/_components/AddMovieToWatchList";
import Image from "next/image";
import { notFound } from "next/navigation";

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  if (!movieId) notFound();
  const configUrl = "https://api.themoviedb.org/3/configuration";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  };
  let configData;
  let movieData;
  let creditsData;
  let similarData;
  try {
    const configApi = await fetch(configUrl, options);
    configData = await configApi.json();
    const movieDataApi = await fetch(url, options);
    movieData = await movieDataApi.json();
    const creditsApi = await fetch(creditsUrl, options);
    creditsData = await creditsApi.json();
    const similarApi = await fetch(similarUrl, options);
    similarData = await similarApi.json();
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return <div>Error loading movies</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <RedirectButton
          classNames={
            "absolute top-2 left-2 py-2 px-4 bg-amber-50 text-black rounded "
          }
          fallbackUrl={"/"}
          label={"Back"}
        />
        <Image
          priority
          width={1920}
          height={1080} // 16:9 ratio
          sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 100vw,
                   100vw"
          className="w-full h-auto object-cover"
          src={`${
            configData?.images.secure_base_url
          }${configData?.images?.backdrop_sizes?.at(-1)}${
            movieData?.backdrop_path
          }`}
          alt={movieData?.original_title}
        />
        <AddMovieToWatchList movie={movieData} />
        <section className="absolute flex flex-col bottom-1 gap-4 p-4">
          <div>
            <h2 className="font-bold text-2xl">{movieData?.original_title}</h2>
          </div>
        </section>
      </div>
      <section>
        <div className="flex flex-col">
          <section>
            <div className="flex flex-col gap-4 items-start pl-4 pt-2">
              <h3>{new Date(movieData?.release_date).getFullYear()}</h3>
              {movieData?.adult && <p>{movieData?.adult ?? "A"}</p>}
            </div>
          </section>
          <section>
            <div className="flex">
              <section className="flex-3 p-4">
                <div>{movieData.overview}</div>
              </section>
              <aside className="flex-1 p-4">
                <section>
                  <div>
                    <p>Cast</p>
                    <div className="flex gap-2 flex-wrap">
                      {creditsData?.cast?.slice(0, 5).map((c) => {
                        return <span key={c?.id}>{c.original_name}</span>;
                      })}
                    </div>
                  </div>
                </section>
                <section>
                  <div>
                    <p>Genres</p>
                    <div className="flex gap-2">
                      {movieData.genres.map(
                        (genre: { id: number; name: string }) => (
                          <span key={genre.id}>{genre.name}</span>
                        )
                      )}
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </div>
      </section>
      <section>
        <div>
          <h2 className="font-bold text-2xl p-4">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {similarData?.results?.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                src={`${configData.images.secure_base_url}${configData.images.poster_sizes[6]}${movie.poster_path}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviePage;
