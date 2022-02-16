import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  deleteItems,
  deliverOrder,
  detailsOrder,
} from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { useTranslation } from "react-i18next";
export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
    loading: loadingDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (!order || successDeliver || (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, order, orderId, successDeliver]);

  const orderHandler = () => {
    //TODO: Smanjiti stanje kolicinu
    dispatch(deleteItems(order._id));
    dispatch(deliverOrder(order._id));
  };
  const { t } = useTranslation();
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="error">{t("wrong_id")}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>{t("shipping")}</h2>
                <p>
                  <strong>{t("name")}:</strong> {order.shippingAddress.fullName}{" "}
                  <br />
                  <strong>{t("address")}:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    {t("delivered_at")} {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">{t("not_delivered")}</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{t("payment")}</h2>
                <p>
                  <strong>{t("method")}:</strong> {order.paymentMethod} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{t("order_items")}</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="row">
                        <div>
                          <img
                            src={item.images[0].name}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {t("selected_color")} :{" "}
                          <div
                            className="colored-circle"
                            style={{ backgroundColor: item.selectedColor }}
                          ></div>
                        </div>
                        <div>
                          {t("size")} : {item.selectedSize}
                        </div>

                        <div>
                          {item.qty} x {item.price}kn = {item.qty * item.price}
                          kn
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>{t("order")}</h2>
              </li>
              <li>
                <div className="row">
                  <div>{t("articles")}</div>
                  <div>{order.itemsPrice}kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("shipping")}</div>
                  <div>{order.shippingPrice}kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("tax")}</div>
                  <div>{order.taxPrice}kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("total")}</div>
                  <div>
                    <strong>{Number(order.totalPrice)}kn</strong>
                  </div>
                </div>
              </li>
              {userInfo.isAdmin && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={() => orderHandler()}
                  >
                    {t("confirm_order")}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
