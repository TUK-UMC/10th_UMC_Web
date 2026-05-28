import { LpCardSkeleton } from "./LpCardSkeleton";

interface LpCardSkeletonList {
  count: number;
}

export const LpCardSkeletonList = ({ count }: LpCardSkeletonList) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};
