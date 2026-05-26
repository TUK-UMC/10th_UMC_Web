import { useCartActions, useCartInfo } from "../hook/useCartStore";
import { useModalActions, useModalInfo } from "../hook/useModalStore";
import { Modal } from "./Modal";

export const PriceBox = () => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();
  const { isOpen } = useModalInfo();
  const { openModal } = useModalActions();

  const handleInitializeCart = () => {
    clearCart();
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleOpenModal}
        className="border p-4 rounded-md cursor-pointer"
      >
        전체 삭제
      </button>
      <div>총 가격: {total}원</div>
      {isOpen && <Modal onConfirm={handleInitializeCart} />}
    </div>
  );
};
