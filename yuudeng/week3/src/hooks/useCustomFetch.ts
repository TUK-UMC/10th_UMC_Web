import axios from "axios";
import { useEffect, useState } from "react";

const useCustomFetch = <T>(url?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;
    const fetchMovies = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [url]);

  return { data, isPending, isError };
};

export default useCustomFetch;
