import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ITEMS_DELETE_SUCCESS,
  ITEMS_DELETE_REQUEST,
  ITEMS_DELETE_FAIL,
} from "../constants/orderConstants";

import { CART_DELETE } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: { Autorisation: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_DELETE });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Autorisation: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders/list", {
      headers: {
        Autorisation: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_ADMIN_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Autorisation: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_ADMIN_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Autorisation: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: {
          Autorisation: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};
export const deleteItems = (orderID) => async (dispatch, getState) => {
  dispatch({ type: ITEMS_DELETE_REQUEST, payload: orderID });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/orders/delete/${orderID}`, {
      headers: {
        Autorisation: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ITEMS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEMS_DELETE_FAIL, payload: message });
  }
};
