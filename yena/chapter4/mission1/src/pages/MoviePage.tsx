import { useState } from "react";
import MovieCard from "../components/MovieCard";
import type { MovieResponse } from "../types/movie";
import Pagenation from "../components/pagenation";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const MoviePage = () => {
    const [page, setPage] = useState(1);

    const params = useParams();
    const url = params.category
    ? `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KR&page=${page}`
    : undefined;
    const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

    if (isError) {
    return (
        <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
        </div>
    );
    }

    return (
    <>
        <Pagenation page={page} setPage={setPage} />
        {isPending && (
        <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
        </div>
        )}
        {!isPending && data && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        )}
    </>
    );
};

export default MoviePage;