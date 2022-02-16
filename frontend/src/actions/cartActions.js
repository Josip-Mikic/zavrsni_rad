import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_DELETE,
  ORDER_STORE,
} from "../constants/cartConstants";

export const addToCart =
  (productId, qty, size, color) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);

    const colorObject = data.colors.find((tempColor) => {
      return tempColor.name === color;
    });

    const sizeObject = colorObject.size.find((x) => x.size === size);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        images: data.images,
        price: data.price,
        countInStock: sizeObject.quantity,
        product: data._id,
        qty,
        selectedSize: size,
        selectedColor: color,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (productId, color) => async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { productId, color },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

export const deleteCart = (dispatch) => {
  dispatch({ type: CART_DELETE });
};

export const storeOrder = (dispatch) => {
  dispatch({ type: ORDER_STORE });
};
