import Container from "@/components/container";
import { IProductItem } from "@/app/store/components/productItem";
import CartButtons from "../../../components/cartButtons";

interface IProductDetails {
  params: Promise<{ id: number }>;
}

async function ProductDetails({ params }: IProductDetails) {
  const { id } = await params;

  const result = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
  const data = (await result.json()) as IProductItem;

  return (
    <Container>
      <div className="grid grid-cols-12 mt-8 shadow-md">
        <div className="col-span-9 rtl text-right p-4">
          <h2 className="font-bold text-2xl">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
          <p className="font-bold">
            قیمت:
            <span>{data.price}$</span>
          </p>
          <CartButtons id={id} />
        </div>
        <div className="col-span-3">
          <img src={data.image} alt={data.title} />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;
