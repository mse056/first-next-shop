"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type TCartContextProviderProps = {
  children: React.ReactNode;
};

type TCartItems = {
  id: number;
  quantity: number;
};

type TCartContext = {
  cartItems: TCartItems[];
  handleAddToCart: (id: number) => void;
  handleDecreaseFromCart: (id: number) => void;
  cartTotalQuantity: number;
  handleRemoveFromCart: (id: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<TCartItems[]>>;
};

const CartContext = createContext({} as TCartContext);

// custom hook to use the cart context
export const useCartContext = () => {
  return useContext(CartContext);
};

export function CartContextProvider({ children }: TCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<TCartItems[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const cartTotalQuantity = cartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0,
  );

  const handleAddToCart = (id: number) => {
    setCartItems((currentItems) => {
      const isNotProductInCart = !currentItems.find((item) => item.id === id);
      if (isNotProductInCart) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    });
  };
  const handleDecreaseFromCart = (id: number) => {
    setCartItems((currentItems) => {
      const isProductInCart = currentItems.find((item) => item.id === id);
      if (isProductInCart) {
        return currentItems
          .map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
      } else {
        return currentItems;
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleDecreaseFromCart,
        handleRemoveFromCart,
        setCartItems,
        cartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
