import CommentSkeleton from "./CommentSkeleton";

interface CommentSkeletonListProps {
  count?: number;
}

const CommentSkeletonList = ({ count = 4 }: CommentSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </>
  );
};

export default CommentSkeletonList;
