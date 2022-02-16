import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { useTranslation } from "react-i18next";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Pouzećem");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  const { t } = useTranslation();
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{t("payment")}</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="pouzece"
              value="Pouzece"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="pouzece">{t("on_delivery")}</label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              id="poslovnica-obrovac"
              value="Poslovnica Obrovac"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="poslovnica-obrovac">
              {t("poslovnica_obrovac")}
            </label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              id="poslovnica-benkovac"
              value="Poslovnica Benkovac"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="poslovnica-benkovac">
              {t("poslovnica_benkovac")}
            </label>
          </div>
        </div>

        <div>
          <button className="primary" type="submit">
            {t("continue")}
          </button>
        </div>
      </form>
    </div>
  );
}
