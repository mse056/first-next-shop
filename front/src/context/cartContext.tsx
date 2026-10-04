'use client'
import React, { createContext, useState } from 'react'

type ICartContextProviderProps = {
  children: React.ReactNode
}

type ICartItems = {
  id: number,
  quantity: number
}

const CartContext = createContext({})


export function CartContextProvider({children}: ICartContextProviderProps) {

  const [cartItems, setCartItems] = useState<ICartItems[]>([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
