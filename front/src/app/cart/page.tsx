"use client";
import CartItem from "@/app/cart/components/cartItem";
import Container from "@/components/container";
import { useCartContext } from "@/context/cartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItem } from "../store/components/productItem";

function Cart() {
  const { cartItems } = useCartContext();
  const [data, setData] = useState<IProductItem[]>([]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios("http://localhost:8000/api/products/")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    const selectedProduct = data.find(
      (product) => Number(product.id) === Number(item.id),
    );
    return total + (selectedProduct?.price || 0) * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyDiscount = async () => {
    setError("");
    setDiscountMessage("");

    if (!couponCode.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/validate-discount/",
        { code: couponCode },
      );
      setDiscountPercent(response.data.percentage);
      setDiscountMessage(response.data.message);
    } catch (err: unknown) {
      setDiscountPercent(0);

      const message = axios.isAxiosError(err)
        ? err.response?.data?.error || "خطایی رخ داده است"
        : "خطایی رخ داده است";

      setError(message);
    }
  };

  return (
    <Container>
      <h1 className="text-right my-4">سبد خرید</h1>

      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="border shadow-md text-right p-4 space-y-2">
        <h3 className="rtl">
          قیمت اولیه: <span>{subtotal.toLocaleString()}$</span>
        </h3>

        {discountPercent > 0 && (
          <h3 className="rtl text-green-600">
            سود شما از این خرید ({discountPercent}٪):{" "}
            <span>{discountAmount.toLocaleString()}$</span>
          </h3>
        )}

        <h3 className="rtl font-bold text-lg">
          قیمت نهایی: <span>{finalTotal.toLocaleString()}$</span>
        </h3>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleApplyDiscount}
            className="bg-sky-600 text-white px-4 py-1 rounded hover:bg-sky-700"
          >
            اعمال
          </button>
          <input
            className="rtl text-right border px-2 py-1 rounded"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
          />
        </div>

        {discountMessage && (
          <p className="text-green-600 text-sm">{discountMessage}</p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </Container>
  );
}

export default Cart;
