import "./App.css";
import Products from "./components/Product";
import Cart from "./components/cart";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const addToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    const updatedQuantity = (quantities[product.id] || 0) + quantity;
    setQuantities({
      ...quantities,
      [product.id]: updatedQuantity >= 0 ? updatedQuantity : 0,
    });
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    setQuantities((prevQuantities) => {
      const { [productId]: removedQuantity, ...restQuantities } =
        prevQuantities;
      return restQuantities;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setQuantities({
      ...quantities,
      [productId]: newQuantity,
    });
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <div className="w-full flex m-4 p-2">
      <Products addToCart={addToCart} quantities={quantities} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;