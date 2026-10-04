"use client";
import { useCartContext } from "@/context/cartContext";

function CartButtons({ id }: { id: number }) {
  const { cartItems, handleAddToCart, handleDecreaseFromCart, handleRemoveFromCart } = useCartContext();

  return (
    <>
      <div className="mt-4">
        <button
          className="px-4 py-2 rounded bg-sky-500"
          onClick={() => handleAddToCart(id)}
        >
          +
        </button>
        <span className="mx-4">
          {cartItems.find((item) => item.id === id)?.quantity || 0}
        </span>
        <button
          className="px-4 py-2 rounded bg-red-500"
          onClick={() => handleDecreaseFromCart(id)}
        >
          -
        </button>
      </div>
      <button className="bg-red-500 text-white px-7 py-2 mt-2 rounded" onClick={() => handleRemoveFromCart(id)}>
        حذف از سبد
      </button>
    </>
  );
}

export default CartButtons;
