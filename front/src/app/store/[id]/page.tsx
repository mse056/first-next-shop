import Container from "@/components/container";
import { IProductItem } from "@/components/productItem";

interface IProductDetails {
  params: Promise<{ id: string }>;
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
          <div className="mt-4">
            <button className="px-4 py-2 rounded bg-sky-500">+</button>
            <span className="mx-4">3</span>
            <button className="px-4 py-2 rounded bg-red-500">-</button>
          </div>
        </div>
        <div className="col-span-3">
          <img src={data.image} alt="" />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;
