import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_DELETE,
  ORDER_STORE,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      let existItem = state.cartItems.find(
        (x) =>
          x.product === item.product && x.selectedColor === item.selectedColor
      );

      //postojeća majica
      if (existItem) {
        existItem.selectedSize = item.selectedSize;
        existItem.qty = item.qty;
        return { ...state };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,

        cartItems: state.cartItems.filter(
          (x) =>
            (x.product === action.payload.productId &&
              x.selectedColor !== action.payload.color) ||
            x.product !== action.payload.productId
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_DELETE:
      return { ...state, cartItems: [] };

    case ORDER_STORE:
      return {};

    default:
      return state;
  }
};
