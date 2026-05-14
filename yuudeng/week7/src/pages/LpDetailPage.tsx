/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  Camera,
  Check,
  EllipsisVertical,
  Heart,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { uploadLpImage } from "../apis/lp";
import CommentSkeletonList from "../components/comment/CommentSkeletonList";
import { useAuth } from "../context/AuthContext";
import { PAGINATION_ORDER } from "../enums/common";
import useDeleteLike from "../hooks/mutate/useDeleteLike";
import useDeleteComment from "../hooks/mutate/useDeleteComment";
import useDeleteLp from "../hooks/mutate/useDeleteLp";
import usePatchComment from "../hooks/mutate/usePatchComment";
import usePatchLp from "../hooks/mutate/usePatchLp";
import usePostComment from "../hooks/mutate/usePostComment";
import usePostLike from "../hooks/mutate/usePostLike";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import type { RequestLpCreateDto } from "../types/lp";
import getRelativeTime from "../utils/relativeTime";

const LpDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lpId } = useParams();
  const numericLpId = Number(lpId);
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: numericLpId });

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: updateLp, isPending: isUpdating } = usePatchLp();
  const { mutate: removeLp, isPending: isDeleting } = useDeleteLp();
  const { mutate: createComment, isPending: isCommentPosting } =
    usePostComment();
  const { mutate: updateComment, isPending: isCommentUpdating } =
    usePatchComment();
  const { mutate: removeComment, isPending: isCommentDeleting } =
    useDeleteComment();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [commentOrder, setCommentOrder] = useState(PAGINATION_ORDER.desc);
  const [commentContent, setCommentContent] = useState("");
  const [openCommentMenuId, setOpenCommentMenuId] = useState<number | null>(
    null,
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const {
    data: comments,
    isPending: isCommentsPending,
    isFetching: isCommentsFetching,
    isFetchingNextPage: isFetchingNextComments,
    hasNextPage: hasNextComments,
    fetchNextPage: fetchNextComments,
    isError: isCommentsError,
  } = useGetInfiniteComments(numericLpId, commentOrder);

  const { ref: commentRef, inView: isCommentRefInView } = useInView({
    threshold: 0,
  });

  const lpTags = lp?.data.tags ?? [];
  const lpLikes = lp?.data.likes ?? [];
  const isLiked = lpLikes.some((like) => like.userId === me?.data.id);
  const isOwner = lp?.data.authorId === me?.data.id;
  const authorName =
    lp?.data.author?.name ??
    (isOwner ? me?.data.name : undefined) ??
    `작성자 ${lp?.data.authorId ?? ""}`;
  const thumbnailSrc = preview || lp?.data.thumbnail || "";
  const isSaving = isUpdating || isUploading;

  useEffect(() => {
    if (!isEditing || !lp) return;

    setTitle(lp.data.title);
    setContent(lp.data.content);
    setTags(lpTags.map((tag) => tag.name));
    setTagInput("");
    setThumbnailFile(null);
    setPreview(null);
  }, [isEditing, lp, lpTags]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (isCommentRefInView && !isCommentsFetching && hasNextComments) {
      void fetchNextComments();
    }
  }, [
    isCommentRefInView,
    isCommentsFetching,
    hasNextComments,
    fetchNextComments,
  ]);

  const openEditForm = () => {
    if (!lp) return;

    setTitle(lp.data.title);
    setContent(lp.data.content);
    setTags(lpTags.map((tag) => tag.name));
    setTagInput("");
    setThumbnailFile(null);
    setPreview(null);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setTagInput("");
    setThumbnailFile(null);
    setPreview(null);
  };

  const handleLikeLp = () => {
    likeMutate({ lpId: numericLpId });
  };

  const handleDislikeLp = () => {
    dislikeMutate({ lpId: numericLpId });
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setThumbnailFile(null);
      setPreview(null);
      return;
    }

    setThumbnailFile(file);
    setPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag || tags.includes(trimmedTag)) return;

    setTags((prev) => [...prev, trimmedTag]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    handleAddTag();
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleDeleteLp = () => {
    if (!confirm("이 LP를 삭제하시겠습니까?")) return;

    removeLp(
      { lpId: numericLpId },
      {
        onSuccess: () => {
          alert("LP가 삭제되었습니다.");
          navigate("/");
        },
        onError: () => {
          alert("LP 삭제에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  };

  const handleUpdateLp = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!lp) return;

    if (!trimmedTitle || !trimmedContent) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const dto: RequestLpCreateDto & { lpId: number } = {
      lpId: numericLpId,
      title: trimmedTitle,
      content: trimmedContent,
      thumbnail: lp.data.thumbnail,
      tags,
    };

    try {
      if (thumbnailFile) {
        setIsUploading(true);
        dto.thumbnail = await uploadLpImage(thumbnailFile);
      }
    } catch {
      alert("이미지를 업로드하는 데 실패했습니다. 다시 시도해주세요.");
      return;
    } finally {
      setIsUploading(false);
    }

    updateLp(dto, {
      onSuccess: () => {
        setIsEditing(false);
        setThumbnailFile(null);
        setPreview(null);
        alert("LP가 업데이트되었습니다.");
      },
      onError: () => {
        alert("LP 업데이트에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const handleCreateComment = () => {
    const trimmedContent = commentContent.trim();

    if (!trimmedContent) {
      alert("댓글을 입력해주세요.");
      return;
    }

    createComment(
      {
        lpId: numericLpId,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setCommentContent("");
          setCommentOrder(PAGINATION_ORDER.desc);
        },
        onError: () => {
          alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  };

  const handleOpenCommentEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
    setOpenCommentMenuId(null);
  };

  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  const handleUpdateComment = (commentId: number) => {
    const trimmedContent = editingCommentContent.trim();

    if (!trimmedContent) {
      alert("댓글을 입력해주세요.");
      return;
    }

    updateComment(
      {
        lpId: numericLpId,
        commentId,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditingCommentContent("");
        },
        onError: () => {
          alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  };

  const handleDeleteComment = (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    removeComment(
      {
        lpId: numericLpId,
        commentId,
      },
      {
        onSuccess: () => {
          setOpenCommentMenuId(null);
          if (editingCommentId === commentId) {
            handleCancelCommentEdit();
          }
        },
        onError: () => {
          alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  };

  if (isPending) {
    return <></>;
  }

  if (isError || !lp) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-900 dark:text-white">
        LP 정보를 불러오지 못했습니다.
      </div>
    );
  }

  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex items-start justify-center w-full my-6">
      <div className="flex items-center flex-col bg-gray-200 dark:bg-[#3c3d45] w-200 p-6 rounded-2xl text-gray-900 dark:text-white">
        <div className="flex flex-col justify-center items-center w-150 p-4">
          <section className="flex items-center justify-between w-full m-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex bg-black dark:bg-white rounded-full w-10 h-10"></div>
              <p className="flex font-bold">{authorName}</p>
            </div>
            <p className="flex">{getRelativeTime(lp.data.updatedAt)}</p>
          </section>

          <section className="flex justify-between w-full m-4">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xl font-bold outline-none focus:border-pink-500 dark:border-gray-600 dark:bg-[#28292E]"
              />
            ) : (
              <h1 className="font-bold text-xl">{lp.data.title}</h1>
            )}

            {isOwner && (
              <div className="flex flex-row gap-2 ml-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleUpdateLp}
                      disabled={isSaving}
                      className="cursor-pointer disabled:text-gray-400"
                      aria-label="Save LP"
                    >
                      <Check />
                    </button>
                    <button
                      type="button"
                      onClick={closeEditForm}
                      disabled={isSaving}
                      className="cursor-pointer disabled:text-gray-400"
                      aria-label="Cancel edit"
                    >
                      <X />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={openEditForm}
                      className="cursor-pointer"
                      aria-label="Edit LP"
                    >
                      <Pencil />
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteLp}
                      disabled={isDeleting}
                      className="cursor-pointer disabled:text-gray-400"
                      aria-label="Delete LP"
                    >
                      <Trash2 />
                    </button>
                  </>
                )}
              </div>
            )}
          </section>

          <section className="relative flex items-center justify-center bg-gray-200 dark:bg-[#3c3d45] shadow-xl/30 shadow-black w-110 h-110 overflow-hidden m-4">
            <label
              htmlFor={isEditing ? "thumbnail" : undefined}
              className={`relative flex items-center justify-center ${
                isEditing ? "cursor-pointer" : ""
              }`}
            >
              <img
                src={thumbnailSrc}
                alt={lp.data.title}
                className="w-100 aspect-square rounded-full object-cover border-2 border-gray-300 dark:border-gray-500 animate-spin"
                style={{
                  animation: "spin 5s linear infinite",
                  animationDirection: "reverse",
                }}
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white">
                  <Camera size={36} />
                </div>
              )}
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              disabled={!isEditing || isSaving}
              className="hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-white border-gray-300 dark:border-gray-500 border-2"></div>
            </div>
          </section>

          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mb-4 w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-pink-500 dark:border-gray-600 dark:bg-[#28292E]"
            />
          ) : (
            <p className="mb-4">{lp.data.content}</p>
          )}

          <section className="flex flex-wrap gap-2 m-4 items-center">
            {isEditing && (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Tag"
                  className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-pink-500 dark:border-gray-600 dark:bg-[#28292E]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-md bg-pink-500 px-3 py-2 text-white"
                >
                  Add
                </button>
              </div>
            )}

            {tags.length > 0 || lpTags.length > 0 ? (
              (isEditing ? tags : lpTags.map((tag) => tag.name)).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={isEditing ? () => handleRemoveTag(tag) : undefined}
                  className="bg-gray-300 dark:bg-gray-600 px-3 py-1 text-gray-900 dark:text-white rounded-2xl text-sm hover:bg-gray-500 transition"
                >
                  #{tag}
                  {isEditing && " x"}
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No tags</p>
            )}
          </section>

          {isSaving && (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
              Saving...
            </p>
          )}

          <section className="flex w-full justify-center">
            <button
              type="button"
              className="flex"
              onClick={isLiked ? handleDislikeLp : handleLikeLp}
            >
              <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "transparent"}
              />
              <p className="flex ml-1">{lpLikes.length}</p>
            </button>
          </section>
        </div>
        <section className="mt-10 flex w-full flex-col gap-5 border-t border-gray-300 pt-6 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">댓글</h2>
            <div className="flex overflow-hidden rounded-lg border border-black dark:border-white">
              <button
                type="button"
                onClick={() => setCommentOrder(PAGINATION_ORDER.asc)}
                className={`px-4 py-2 text-sm ${
                  commentOrder === PAGINATION_ORDER.asc
                    ? "bg-white text-black dark:bg-black dark:text-white"
                    : "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                오래된순
              </button>
              <button
                type="button"
                onClick={() => setCommentOrder(PAGINATION_ORDER.desc)}
                className={`px-4 py-2 text-sm ${
                  commentOrder === PAGINATION_ORDER.desc
                    ? "bg-white text-black dark:bg-black dark:text-white"
                    : "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 입력해주세요."
              rows={3}
              className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-pink-500 dark:border-gray-600 dark:bg-[#28292E]"
            />
            <button
              type="button"
              onClick={handleCreateComment}
              disabled={isCommentPosting}
              className="ml-auto rounded-md bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600 disabled:bg-gray-400"
            >
              {isCommentPosting ? "작성 중..." : "작성"}
            </button>
          </div>

          {isCommentsPending && <CommentSkeletonList count={5} />}

          {isCommentsError && (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              댓글을 불러오지 못했습니다.
            </p>
          )}

          {!isCommentsPending &&
            !isCommentsError &&
            comments?.pages.flatMap((page) => page.data.data).length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-300">
                아직 댓글이 없습니다.
              </p>
            )}

          {comments?.pages
            .flatMap((page) => page.data.data)
            .map((comment) => {
              const isMyComment = comment.authorId === me?.data.id;
              const isCommentEditing = editingCommentId === comment.id;

              return (
                <article key={comment.id} className="flex w-full gap-3">
                  <img
                    src={comment.author.avatar || "/images/google.svg"}
                    alt={comment.author.name}
                    className="size-10 shrink-0 rounded-full object-cover bg-gray-300"
                  />
                  <div className="flex flex-1 justify-between items-start gap-3">
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{comment.author.name}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {getRelativeTime(comment.createdAt)}
                        </span>
                      </div>

                      {isCommentEditing ? (
                        <div className="mt-2 flex flex-col gap-2">
                          <textarea
                            value={editingCommentContent}
                            onChange={(e) =>
                              setEditingCommentContent(e.target.value)
                            }
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-pink-500 dark:border-gray-600 dark:bg-[#28292E]"
                          />
                          <div className="ml-auto flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateComment(comment.id)}
                              disabled={isCommentUpdating}
                              className="text-gray-500 hover:text-pink-500 disabled:text-gray-300 dark:text-white"
                              aria-label="댓글 수정 저장"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelCommentEdit}
                              disabled={isCommentUpdating}
                              className="text-gray-500 hover:text-pink-500 disabled:text-gray-300 dark:text-white"
                              aria-label="댓글 수정 취소"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm">
                          {comment.content}
                        </p>
                      )}
                    </div>

                    {isMyComment && !isCommentEditing && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCommentMenuId((currentId) =>
                              currentId === comment.id ? null : comment.id,
                            )
                          }
                          className="text-gray-500 hover:text-pink-500 dark:text-gray-300"
                          aria-label="댓글 메뉴"
                        >
                          <EllipsisVertical size={20} />
                        </button>

                        {openCommentMenuId === comment.id && (
                          <div className="absolute right-0 top-7 z-10 flex overflow-hidden rounded-md border border-gray-300 bg-white shadow-md dark:border-gray-600 dark:bg-[#28292E]">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenCommentEdit(
                                  comment.id,
                                  comment.content,
                                )
                              }
                              className="px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-[#3c3d45]"
                              aria-label="댓글 수정"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={isCommentDeleting}
                              className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:text-gray-300 dark:text-white dark:hover:bg-[#3c3d45]"
                              aria-label="댓글 삭제"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}

          {isFetchingNextComments && <CommentSkeletonList count={2} />}
          <div ref={commentRef} className="h-2" />
        </section>
      </div>
    </div>
  );
};

export default LpDetailPage;
