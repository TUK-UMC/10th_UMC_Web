import { X } from "lucide-react";
import type { Movie } from "../types/movie";

interface MovieInfoModalProps {
  movie: Movie | null;
  onClose: () => void;
}

function MovieInfoModal({ movie, onClose }: MovieInfoModalProps) {
  if (!movie) return null; // 영화 없으면 렌더 X

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      onClick={onClose} // 바깥 클릭 시 닫기
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl shadow-xl"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <div>
          {movie.backdrop_path && (
            <div className="relative w-full h-72 overflow-hidden object-center">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80"></div>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 bg-black/40 p-2 rounded-full text-sm"
              >
                <X color="white" />
              </button>
              <h2 className="absolute bottom-5 left-5 text-3xl font-bold text-white">
                {movie.title}
              </h2>
            </div>
          )}
        </div>
        <div className="flex p-6">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md h-72 w-auto object-cover"
            />
          )}
          <div className="flex flex-col w-full px-4">
            <section className="flex items-center gap-2">
              <p
                className={`text-xl font-bold ${
                  movie.vote_average.toFixed(1) === "0.0"
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">
                ({movie.vote_count.toLocaleString()} 평가)
              </p>
            </section>
            <section className="flex flex-col items-center justify-center gap-2 m-2">
              <p className="font-semibold">개봉일</p>
              <p>
                {movie.release_date.slice(0, 4)}년{" "}
                {movie.release_date.slice(5, 7)}월{" "}
                {movie.release_date.slice(8, 10)}일
              </p>
            </section>
            <section className="flex flex-col items-center justify-center gap-2 my-2">
              <p className="font-semibold">인기도</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${movie.popularity}%` }}
                />
              </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-2 my-2">
              <p className="font-semibold">줄거리</p>
              <p className="text-gray-700 text-center">
                {movie.overview || "줄거리 없음"}
              </p>
            </section>
            <section className="flex gap-4">
              <button
                onClick={() =>
                  window.open(`https://www.imdb.com/find?q=${movie.title}`)
                }
                className="text-sm text-white bg-blue-500 rounded-md px-3 py-2"
              >
                IMDB에서 검색
              </button>
              <button
                onClick={onClose}
                className="text-sm text-blue-500 border border-blue-500 rounded-md px-3 py-2"
              >
                닫기
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoModal;
