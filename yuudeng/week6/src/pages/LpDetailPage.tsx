import { Navigate, useLocation, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, Trash2 } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import getRelativeTime from "../utils/relativeTime";
import usePostLike from "../hooks/mutate/usePostLike";
import useDeleteLike from "../hooks/mutate/useDeleteLike";

const LpDetailPage = () => {
  const location = useLocation();
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isPending && isError) {
    return <></>;
  }

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return (
    <div className="flex items-start justify-center w-full my-6">
      <div className="flex items-center flex-col bg-gray-200 dark:bg-[#3c3d45] w-200 p-6 rounded-2xl text-gray-900 dark:text-white">
        <div className="flex flex-col justify-center items-center w-150 p-4">
          <section className="flex items-center justify-between w-full m-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex bg-black dark:bg-white rounded-full w-10 h-10"></div>
              <p className="flex font-bold">게시자</p>
            </div>
            <p className="flex">{getRelativeTime(lp?.data.updatedAt)}</p>
          </section>
          <section className="flex justify-between w-full m-4">
            <h1 className="font-bold text-xl">{lp?.data.title}</h1>
            <div className="flex flex-row gap-2">
              <Pencil className="flex" />
              <Trash2 className="flex" />
            </div>
          </section>
          <section className="relative flex items-center justify-center bg-gray-200 dark:bg-[#3c3d45] shadow-xl/30 shadow-black w-110 h-110 overflow-hidden m-4">
            <img
              src={lp?.data.thumbnail}
              alt={lp?.data.title}
              className="w-100 aspect-square rounded-full object-cover border-2 border-gray-300 dark:border-gray-500 animate-spin"
              style={{
                animation: "spin 5s linear infinite",
                animationDirection: "reverse",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" w-20 h-20 rounded-full bg-white border-gray-300 dark:border-gray-500 border-2"></div>
            </div>
          </section>
          <p className="mb-4">{lp?.data.content}</p>
          <section className="flex flex-wrap gap-2 m-4 items-center">
            {lp?.data.tags && lp.data.tags.length > 0 ? (
              lp.data.tags.map((tag) => (
                <button
                  key={tag.id}
                  className="bg-gray-300 dark:bg-gray-600 px-3 py-1 text-gray-900 dark:text-white rounded-2xl text-sm hover:bg-gray-500 transition"
                >
                  #{tag.name}
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm">태그 없음</p>
            )}
          </section>
          <section className="flex w-full justify-center">
            <button
              className="flex"
              onClick={isLiked ? handleDislikeLp : handleLikeLp}
            >
              <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "transparent"}
              />
              <p className="flex ml-1">{lp?.data.likes.length}</p>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
