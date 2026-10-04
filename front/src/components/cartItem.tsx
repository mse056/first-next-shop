import React from 'react'

function CartItem() {
  return (
    <div className="grid grid-cols-12 bg-slate-200 mb-4">
      <div className="col-span-10 text-right p-4">
        <h2 className="text-xl font-bold"></h2>
        <p>
          تعداد:<span>3</span>
        </p>
        <p className='rtl'>
          قیمت:<span>25$</span>
        </p>
        <div className="mt-4">
          <button className="px-4 py-2 rounded bg-sky-500">+</button>
          <span className="mx-4">3</span>
          <button className="px-4 py-2 rounded bg-red-500">-</button>
        </div>
      </div>
      <img className="col-span-2" src="" alt="" />
    </div>
  );
}

export default CartItem