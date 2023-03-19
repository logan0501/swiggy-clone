import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  restaurantId: -1,
  addItem: (item) => {},
  removeItem: (id) => {},
  addItemById: (id) => {},
  clearCart: () => {},
  hasError: false,
  clearError: () => {},
});
export default CartContext;
