import { IProductItem } from "@/app/store/components/productItem";
import CartButtons from "@/components/cartButtons";
import axios from "axios";
import { useEffect, useState } from "react";

interface CartItemProps {
  id: number;
  quantity: number;
}

function CartItem({ id, quantity }: CartItemProps) {
  const [data, setData] = useState({} as IProductItem);

  useEffect(() => {
    axios(`http://localhost:8000/api/products/${id}/`)
      .then((response) => {
        // const { data } = response;
        setData(response.data);
        // console.log(response)
        // console.log(`data fetched for product with id ${id}:`, data);
      })
      .catch((error) => {
        console.error(`Error fetching product with id ${id} error:${error}`);
      });
  }, []);

  return (
    <div className="grid grid-cols-12 bg-slate-200 mb-4">
      <div className="col-span-10 text-right p-4">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p>
          تعداد:<span>{quantity}</span>
        </p>
        <p className="rtl">قیمت:<span>{data.price}$</span></p>
        <CartButtons id={id} />
      </div>
      <img className="col-span-2" src={data.image} alt={data.title} />
    </div>
  );
}

export default CartItem;
