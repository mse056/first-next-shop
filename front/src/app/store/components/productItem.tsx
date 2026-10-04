
export interface IProductItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

function ProductItem({ title, image, price }: IProductItem) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden flex flex-col h-full bg-white">
      <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-3 text-right rtl flex-1 flex flex-col justify-between">
        <h3 className="font-bold">{title}</h3>
        <p>
          قیمت: <span>{price}$</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
