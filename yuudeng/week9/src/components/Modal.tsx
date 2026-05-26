import { useModalActions } from "../hook/useModalStore";

interface ModalProps {
  onConfirm: () => void;
}

export const Modal = ({ onConfirm }: ModalProps) => {
  const { closeModal } = useModalActions();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className="fixed flex inset-0 items-center justify-center bg-black/40">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 w-70">
        <h2 className="text-lg font-bold">정말 삭제하시겠습니까?</h2>
        <div className="flex gap-4 mt-6 w-70 px-6 justify-end">
          <button
            className="flex bg-gray-200 px-4 py-2 rounded-md"
            onClick={handleCloseModal}
          >
            아니요
          </button>
          <button
            className="flex bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};
