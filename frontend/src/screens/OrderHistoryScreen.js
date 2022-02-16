import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useTranslation } from "react-i18next";

export default function OrderHistoryScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const dispatch = useDispatch();
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("order_history")}</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{t("id")}</th>
              <th>{t("date")}</th>
              <th>{t("price")}</th>
              <th>{t("order_done")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "Ne"}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
