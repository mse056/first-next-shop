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

  useEffect(() => {
    axios(`http://localhost:8000/api/products/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching product with id error:${error}`);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-right my-4">سبد خرید</h1>

      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}

      <div className="border shadow-md text-right p-4">
        <h3 className="rtl">
          قیمت کل:
          <span>
            {cartItems
              .reduce((total, item) => {
                const selectedProduct = data.find(
                  (product) => Number(product.id) === Number(item.id),
                );
                return total + (selectedProduct?.price || 0) * item.quantity;
              }, 0)
              .toLocaleString()}
            $
          </span>
        </h3>

        <h3 className="rtl">
          سود شما از این خرید:<span>77$</span>
        </h3>
        <h3 className="rtl">
          قیمت نهایی:<span>77$</span>
        </h3>
        <div>
          <button className="bg-sky-600 text-white px-4 py-1 rounded">
            اعمال
          </button>
          <input
            className="rtl text-right border"
            type="text"
            placeholder="کد تخفیف را وارد کنید"
          />
        </div>
      </div>
    </Container>
  );
}

export default Cart;
