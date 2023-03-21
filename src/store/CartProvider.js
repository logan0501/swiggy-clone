import CartContext from "./cart-context";
import { useReducer } from "react";

const initialCartItem = {
  items: [],
  totalAmount: 0,
  restaurantId: -1,
  hasError: false,
};

function cartReducer(state, action) {
  console.log(action);
  if (action.type === "ADD") {
    if (
      state.restaurantId == -1 ||
      state.restaurantId === action.item.restaurantId
    ) {
      const updatedTotalAmount = state.totalAmount + action.item.price;
      let updatedItems;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item];
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        restaurantId: action.item.restaurantId,
        hasError: state.hasError,
      };
    } else {
      return {
        items: state.items,
        totalAmount: state.totalAmount,
        restaurantId: state.restaurantId,
        hasError: true,
      };
    }
  }
  if (action.type === "ADD_ID") {
    let updatedItems;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount + existingItem.price;

    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      restaurantId: state.restaurantId,
      hasError: state.hasError,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let updatedTotalAmount = 0;
    if (state.totalAmount - existingItem.price > 0)
      updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem) {
      if (existingItem.quantity == 1) {
        updatedItems = state.items.filter((item) => item.id != action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
    } else {
      updatedItems = [...state.items, action.item];
    }
    let newRestaurantId = state.restaurantId;
    if (updatedItems.length === 0) newRestaurantId = -1;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      restaurantId: newRestaurantId,
      hasError: false,
    };
  }
  if (action.type === "CLEAR") {
    localStorage.clear();
    return initialCartItem;
  }
  if (action.type === "CLEAR_ERROR") {
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      restaurantId: state.restaurantId,
      hasError: false,
    };
  }
  return initialCartItem;
}

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCartItem);
  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({
      type: "REMOVE",
      id: id,
    });
  };
  const addItemToCartById = (id) => {
    dispatchCart({ type: "ADD_ID", id: id });
  };
  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const clearErrorHandler = () => {
    dispatchCart({ type: "CLEAR_ERROR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    addItemById: addItemToCartById,
    clearCart: clearCartHandler,
    clearError: clearErrorHandler,
    hasError: cartState.hasError,
  };
  localStorage.setItem("cart", JSON.stringify(cartState));
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
