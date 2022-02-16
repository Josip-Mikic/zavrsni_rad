import React, { useEffect } from "react";
import axios from "axios";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useTranslation } from "react-i18next";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(5) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = () => {
    try {
      axios.post("/api/send", { cart, user }); //salje se email
    } catch (e) {
      console.log(e);
    }
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); //redux sprema narudzbu
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, props.history, order]);
  const { t } = useTranslation();
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>{t("shipping")}</h2>
                <p>
                  <strong>{t("enter_name")}:</strong>{" "}
                  {cart.shippingAddress.fullName} <br />
                  <strong>{t("address")} : </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{t("payment")}</h2>
                <p>
                  <strong>{t("method")}:</strong> {cart.paymentMethod} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{t("products")}</h2>
                <ul className="text-small ">
                  {cart.cartItems.map((item) => (
                    <li
                      key={
                        item.product + item.selectedColor + item.selectedSize
                      }
                    >
                      <div className="grid-products">
                        <div>
                          <img
                            src={item.images[0].name}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div>
                          <Link
                            to={`/product/${item.product}`}
                            className=" primary-color"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div>{t("selected_color")} :</div>
                        <div
                          className="colored-circle"
                          style={{ backgroundColor: item.selectedColor }}
                        ></div>
                        <div>
                          {t("size")} : {item.selectedSize}
                        </div>

                        <div>{item.qty * item.price} Kn</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body text-small">
            <ul>
              <li>
                <h2>{t("order")}</h2>
              </li>
              <li>
                <div className="row">
                  <div>{t("products")}</div>
                  <div>{cart.itemsPrice} Kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("shipping")}</div>
                  <div>{cart.shippingPrice} Kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("tax")}</div>
                  <div>{cart.taxPrice} Kn</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>{t("total")}</div>
                  <div>
                    <strong>{Number(cart.totalPrice)} Kn</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  {t("place_order")}
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
