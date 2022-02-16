import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_SUCCESS,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
} from "../constants/productConstants";

import Axios from "axios";
import axios from "axios";

export const listProducts =
  (gender = "none", categories = "all") =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    try {
      //?&category=${category}
      const { data } = await Axios.get(
        `/api/products?gender=${gender}&categories=${categories}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message,
      });
    }
  };
export const listProductCategories = (gender) => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });

  try {
    //?&category=${category}
    const { data } = await Axios.get(
      `/api/products/categories?gender=${gender}`
    );
    console.log(data);
    dispatch({
      type: PRODUCT_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};
export const listCategories = (gender) => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  });

  try {
    //?&category=${category}
    const { data } = await Axios.get("/api/categories");
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};
export const addCategory = (category) => async (dispatch, getState) => {
  dispatch({ type: NEW_CATEGORY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/products/category",
      { name: category },
      {
        headers: { Autorisation: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: NEW_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch({ type: NEW_CATEGORY_FAIL, payload: message });
  }
};
export const editCategory =
  (text, category, subcategory) => async (dispatch, getState) => {
    dispatch({ type: EDIT_CATEGORY_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        "/api/products/category",
        { cat: category, txt: text, subcat: subcategory },
        {
          headers: { Autorisation: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: EDIT_CATEGORY_SUCCESS, payload: data.category });
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      dispatch({ type: EDIT_CATEGORY_FAIL, payload: message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });

  try {
    const { data } = await Axios.get(`/api/products/${productId}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/products",
      {},
      { headers: { Autorisation: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Autorisation: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    axios.delete(`/api/products/${productId}`, {
      headers: { Autorisation: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
