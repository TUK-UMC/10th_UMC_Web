import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

interface MovieDetail {
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
}

interface Credit {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const detailUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
    : undefined;
  const creditUrl = movieId
    ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
    : undefined;
  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieDetail>(detailUrl);
  const { data: credits } = useCustomFetch<Credit>(creditUrl);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movies) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  const director = credits?.crew.find((person) => person.job === "Director");

  return (
    <div className="w-full bg-black">
      <section className="relative px-4 w-full h-[50vh] overflow-hidden ">
        <img
          src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
          className="w-full h-full object-cover object-center rounded-xl "
        />
        <div className="absolute inset-0 left-4 bg-linear-to-r from-black from-10% to-transparent rounded-xl" />
        <section className="absolute top-4 w-[40%] h-[95%] border-transparent border border-b-white">
          <div className="text-white font-bold text-3xl mb-2 ml-2">
            {movies.title}
          </div>
          <div className="text-white text-md ml-2">
            평균 {movies.vote_average.toFixed(1)}
          </div>
          <div className="text-white text-md ml-2">
            {movies.release_date.substring(0, 4)}
          </div>
          <div className="text-white text-md ml-2">{movies.runtime}분</div>
          <div className="text-white text-sm mt-3 ml-2">{movies.overview}</div>
        </section>
      </section>
      <section className="relative">
        <div className="text-white font-bold text-3xl my-4 ml-6">감독/출연</div>
        <div className="grid text-center grid-cols-10 p-4 px-8">
          {credits?.cast.map((actor) => (
            <section className="overflow-hidden place-items-center py-6">
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                className="rounded-full w-25 h-25 object-cover object-center border-2 border-white"
              />
              <div className="text-white pt-2 text-md">{actor.name}</div>
              <div className="text-gray-600 text-sm">{actor.character}</div>
            </section>
          ))}
          {director && (
            <section className="overflow-hidden place-items-center py-6">
              <img
                src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                className="rounded-full w-25 h-25 object-cover object-center border-2 border-white"
              />
              <div className="text-white pt-2 text-md">{director.name}</div>
              <div className="text-gray-600 text-sm">{director.job}</div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetailPage;
