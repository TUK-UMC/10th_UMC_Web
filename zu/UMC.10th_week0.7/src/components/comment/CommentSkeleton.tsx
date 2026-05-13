const CommentSkeleton = () => {
    return (
    <div className="flex w-full gap-3 animate-pulse">
        <div className="size-10 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
    </div>
    );
};

export default CommentSkeleton;