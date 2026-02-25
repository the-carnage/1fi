import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  const addItem = (product, variant) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product._id && i.variantId === variant._id,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === product._id && i.variantId === variant._id
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          variantId: variant._id,
          name: product.name,
          variantName: variant.variantName,
          price: variant.price,
          image: variant.images[0],
          qty: 1,
        },
      ];
    });
    setOpen(true);
  };
  const removeItem = (productId, variantId) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId),
      ),
    );
  };
  const clearCart = () => setItems([]);
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
