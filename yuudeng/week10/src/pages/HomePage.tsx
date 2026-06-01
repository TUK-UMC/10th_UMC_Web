import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import { MovieList } from "../components/MovieList";
import { useFetch } from "../hooks/useFetch";
import MovieInfoModal from "../components/MovieInfoModal";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩중입니다...</div>
      ) : (
        <>
          <MovieList
            movies={data?.results || []}
            onSelect={handleSelectMovie}
          />
          {selectedMovie && (
            <MovieInfoModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
