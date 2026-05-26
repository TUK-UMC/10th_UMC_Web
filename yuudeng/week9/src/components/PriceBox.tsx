import { useDispatch, useSelector } from "../hook/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

export const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer"
      >
        전체 삭제
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};
