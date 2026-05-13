import { X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp } from "../../../apis/lp";
import { QUERY_KEY } from "../../../constants/key";
import { axiosInstance } from "../../../apis/axios";
import type { RequestLpCreateDto } from "../../../types/lp";

interface CreateLpModalProps {
    onClose: () => void;
}

export const CreateLpModal = ({ onClose }: CreateLpModalProps) => {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
        setTags((prev) => [...prev, trimmed]);
        setTagInput("");
    }
    };

    const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
    };

    const { mutate: createLp, isPending } = useMutation({
    mutationFn: postLp,
    onSuccess: () => {
        alert("LP가 성공적으로 추가되었습니다!");
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        onClose();
    },
    onError: () => {
        alert("LP 추가에 실패했습니다. 다시 시도해주세요.");
    },
    });

    const handleSubmit = async () => {
    if (!title || !content || !image) {
        alert("이미지, 제목, 내용을 모두 입력해주세요!");
        return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const { data: uploadData } = await axiosInstance.post(
        "/v1/uploads",
        formData,
        {
        headers: { "Content-Type": "multipart/form-data" },
        },
    );

    const thumbnailUrl = uploadData.data.imageUrl;

    const dto: RequestLpCreateDto = {
        title,
        content,
        tags,
        thumbnail: thumbnailUrl,
    };

    createLp(dto);
    };

    return (
    <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
    >
        <div
        className="bg-white dark:bg-[#28292E] rounded-2xl shadow-lg p-8 w-125 relative animate-fadeIn overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        >
        {/* 닫기 버튼 */}
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-white hover:text-black"
        >
            <X size={24} />
        </button>

        {/* LP 이미지 업로드 */}
        <div className="flex flex-col items-center mb-6">
            <label
            htmlFor="thumbnail"
            className="w-40 h-40 rounded-full bg-gray-200 dark:bg-black border-2 border-dashed border-gray-400 dark:border-gray-950 flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-[#3A3B40] transition"
            >
            {preview ? (
                <img
                src={preview}
                alt="LP Thumbnail"
                className="w-full h-full object-cover rounded-full"
                />
            ) : (
                <span className="text-gray-600 dark:text-white text-sm text-center">
                LP 이미지 업로드
                </span>
            )}
            </label>
            <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            />
        </div>

        {/* 제목 입력 */}
        <input
            type="text"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 dark:border-[#989699] dark:text-[#989699] rounded-md px-3 py-2 focus:border-pink-500 outline-none w-full mb-3"
        />

        {/* 내용 입력 */}
        <input
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 dark:border-[#989699] dark:text-[#989699] rounded-md px-3 py-2 focus:border-pink-500 outline-none w-full mb-4"
        />

        {/* 태그 추가 */}
        <div className="flex items-center gap-2 mb-2">
            <input
            type="text"
            placeholder="LP Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="border border-gray-300 dark:border-[#989699] dark:text-[#989699] rounded-md px-3 py-2 flex-1 focus:border-pink-500 outline-none"
            />
            <button
            onClick={handleAddTag}
            className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600"
            >
            Add
            </button>
        </div>

        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
            <div
                key={tag}
                className="flex items-center bg-gray-200 dark:bg-[#3A3B40] px-3 py-1 rounded-full text-sm"
            >
                <span>#{tag}</span>
                <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500"
                >
                <X size={14} />
                </button>
            </div>
            ))}
        </div>

        {/* LP 추가 버튼 */}
        <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition disabled:bg-gray-400"
        >
            {isPending ? "추가 중..." : "Add LP"}
        </button>
        </div>
    </div>
    );
};