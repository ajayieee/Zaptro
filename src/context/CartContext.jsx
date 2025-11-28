import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  function addToCart(product) {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      // increase quantity if already in cart

      const updateCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updateCart);
      toast.success("Product quantity increased!");
    } else {
      // Add new Item with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  }

  // function getCurrentQuantityById(id) {
  //   const item = cartItem.find((item) => item.id === id);
  //   return item ? item.quantity : 0;
  // }

  function updateQuantity(cartItem, ProductId, action) {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === ProductId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit = newUnit + 1;
              toast.success("Quantity is increased!");
            } else if (action === "decrease") {
              newUnit = newUnit - 1;
              toast.success("Quantity is decreased!");
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null) // remove item with quantity zero
    );
  }

  function deleteItem(productId) {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product is deleted from cart!");
  }

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext was used outside the CartProvider");
  return context;
}

export { CartProvider, useCart };
