import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import { useTranslation } from "react-i18next";
export default function OrderListScreen(props) {
  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <div>
        <h1>{t("order_history")}</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>{t("id")}</th>
                <th>{t("users")}</th>
                <th>{t("date")}</th>
                <th>{t("price")}</th>
                <th>{t("delivered_at")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {<td>{order.user.name}</td>}

                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : `${t("no")}`}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      {t("details")}
                    </button>
                    <button
                      className="small"
                      onClick={() => deleteHandler(order)}
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
    </div>
  );
}
