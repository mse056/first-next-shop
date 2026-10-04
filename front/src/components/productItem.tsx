import Image from 'next/image';
import React from 'react'

export interface IProductItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

function ProductItem({title, image, price}: IProductItem) {
  return (
    <div className='shadow-md'>
      <img src={image} alt=''/>
      <div className='p-2 text-right rtl'>
        <h3 className='font-bold'>{title}</h3>
        <p>قیمت: <span>{price}$</span></p>
      </div>
    </div>
  )
}

export default ProductItem