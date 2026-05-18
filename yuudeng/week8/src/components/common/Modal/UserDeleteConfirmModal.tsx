import { X } from "lucide-react";

interface DeleteConfirmModalProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const UserDeleteConfirmModal = ({
  message = "정말 탈퇴하시겠습니까?",
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-[#3c3d45] rounded-lg p-6 shadow-lg w-96">
        <div className="flex justify-end mb-4">
          <X
            size={24}
            className="text-gray-800 dark:text-white"
            onClick={onCancel}
          />
        </div>
        <p className="text-center text-lg font-semibold mb-6 text-gray-800 dark:text-white">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              onConfirm();
              onCancel(); // 확인 후 자동 닫힘
            }}
            className="w-24 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="w-24 px-4 py-2 rounded-md bg-[#E63996] text-white hover:bg-[#d6288d] transition"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteConfirmModal;
