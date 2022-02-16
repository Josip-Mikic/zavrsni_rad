import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
// import ReactPaginate from "react-paginate";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import { useTranslation } from "react-i18next";
export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  const { t } = useTranslation();
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("name")}</th>
              <th>{t("price")}</th>
              <th>{t("category")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  {product.images[0] ? (
                    <td className="row ">
                      <img
                        src={product.images[0].name}
                        className="small"
                        alt=""
                      />{" "}
                    </td>
                  ) : (
                    <td>{t("loading")}</td>
                  )}

                  <td>{product.name}</td>
                  <td>{product.price}kn</td>
                  <td>{product.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      {t("edit")}
                    </button>

                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
