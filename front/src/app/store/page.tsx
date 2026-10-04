import Container from "@/components/container";
import ProductItem, { IProductItem } from "@/components/productItem";
import Link from "next/link";

async function Store() {
  
  const result = await fetch("http://127.0.0.1:8000/api/products/");
  const data = await result.json() as IProductItem[]

  return (
    <Container>
      <h2 className="text-right py-4">لیست محصولات</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item: IProductItem) => {
          return (
            <Link key={item.id} href={`/store/${item.id}`}>
              <ProductItem {...item} />
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

export default Store;
