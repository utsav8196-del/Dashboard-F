import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

const CART_STORAGE_KEY = "ecomm-cart";
const WISHLIST_STORAGE_KEY = "ecomm-wishlist";

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]"));
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]"),
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: wishlist.length,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addToCart(product, quantity = 1) {
        setCart((previous) => {
          const existing = previous.find((item) => item._id === product._id);

          if (existing) {
            return previous.map((item) =>
              item._id === product._id
                ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
                : item,
            );
          }

          return [...previous, { ...product, quantity }];
        });
      },
      removeFromCart(productId) {
        setCart((previous) => previous.filter((item) => item._id !== productId));
      },
      updateCartQuantity(productId, quantity) {
        setCart((previous) =>
          previous.map((item) => (item._id === productId ? { ...item, quantity } : item)),
        );
      },
      clearCart() {
        setCart([]);
      },
      toggleWishlist(product) {
        setWishlist((previous) => {
          const exists = previous.some((item) => item._id === product._id);
          return exists
            ? previous.filter((item) => item._id !== product._id)
            : [...previous, product];
        });
      },
      isWishlisted(productId) {
        return wishlist.some((item) => item._id === productId);
      },
    }),
    [cart, wishlist],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }

  return context;
}
