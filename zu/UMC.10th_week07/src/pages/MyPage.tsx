import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, Check, Settings, X } from "lucide-react";
import { uploadProfileImage } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import usePatchMyInfo from "../hooks/mutate/usePatchMyInfo";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import type { RequestUpdateMyInfoDto } from "../types/auth";

const MyPage = () => {
  const { accessToken } = useAuth();
  const { data } = useGetMyInfo(accessToken);
  const { mutate: updateMyInfo, isPending } = usePatchMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const avatarSrc = preview || data?.data.avatar || "/images/google.svg";
  const isSaving = isPending || isUploading;

  useEffect(() => {
    if (!isEditing || !data) return;

    setName(data.data.name);
    setBio(data.data.bio ?? "");
    setAvatarFile(null);
    setPreview(null);
  }, [data, isEditing]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const openEditForm = () => {
    if (!data) return;

    setName(data.data.name);
    setBio(data.data.bio ?? "");
    setAvatarFile(null);
    setPreview(null);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setPreview(null);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setAvatarFile(null);
      setPreview(null);
      return;
    }

    setAvatarFile(file);
    setPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    const dto: RequestUpdateMyInfoDto = {
      name: trimmedName,
      bio: bio.trim(),
    };

    try {
      if (avatarFile) {
        setIsUploading(true);

        dto.avatar = await uploadProfileImage(avatarFile);
      }
    } catch {
      alert("Failed to upload the image. Please try again.");
      return;
    } finally {
      setIsUploading(false);
    }

    updateMyInfo(dto, {
      onSuccess: () => {
        setIsEditing(false);
        setAvatarFile(null);
        setPreview(null);
        alert("Profile updated.");
      },
      onError: () => {
        alert("Failed to update profile. Please try again.");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center justify-center gap-4 mb-4"
      >
        <label
          htmlFor="avatar"
          className={`relative flex size-30 items-center justify-center overflow-hidden rounded-full bg-gray-200 ${
            isEditing ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={avatarSrc}
            alt="Profile"
            className="size-full rounded-full object-cover"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <Camera size={24} />
            </div>
          )}
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={!isEditing || isSaving}
          className="hidden"
        />

        <div className="flex flex-col gap-2 dark:text-white">
          <div className="flex items-center gap-4">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="rounded-md border border-gray-300 px-3 py-2 font-bold outline-none focus:border-pink-500 dark:border-[#989699] dark:bg-[#28292E]"
              />
            ) : (
              <h1 className="flex border-black p-2 rounded-md font-bold">
                {data?.data.name}님의 페이지입니다.
              </h1>
            )}

            {isEditing ? (
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="text-gray-500 hover:text-pink-500 disabled:text-gray-300 dark:text-white"
                  aria-label="Save profile"
                >
                  <Check />
                </button>
                <button
                  type="button"
                  onClick={closeEditForm}
                  disabled={isSaving}
                  className="text-gray-500 hover:text-pink-500 disabled:text-gray-300 dark:text-white"
                  aria-label="Cancel edit"
                >
                  <X />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openEditForm}
                className="text-gray-400 dark:text-white cursor-pointer hover:text-pink-500"
                aria-label="Edit profile"
              >
                <Settings />
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={2}
              className="w-80 resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-pink-500 dark:border-[#989699] dark:bg-[#28292E]"
            />
          ) : (
            <h1 className="flex border-black p-2 rounded-md">
              {data?.data.bio || "No bio yet."}
            </h1>
          )}
          <p>{data?.data.email}</p>
          {isSaving && (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Saving...
            </p>
          )}
        </div>
      </form>

      <div className="flex flex-col items-center justify-center w-full gap-10 border-t border-gray-400 dark:border-[#333337]">
        <div className="flex items-center justify-center dark:text-white">
          <button className="border-t-3 border-black dark:border-white px-4">
            내가 좋아요 한 LP
          </button>
          <button className="px-4">내가 작성한 LP</button>
        </div>
        <div className="flex border-black w-fit justify-end mx-4 mb-4 rounded-xl overflow-hidden ml-auto">
          <button className="p-2 bg-black text-white">오래된순</button>
          <button className="p-2 dark:text-white">최신순</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;