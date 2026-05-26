import { useDispatch, useSelector } from "../hook/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";
import { Modal } from "./Modal";

export const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  const handleOpenModal = () => {
    dispatch(openModal());
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
