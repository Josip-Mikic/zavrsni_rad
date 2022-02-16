import React, { useState } from "react";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function ShippingAddressScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, city, postalCode }));
    props.history.push("/payment");
    //dispatch shipping address action
  };
  const { t } = useTranslation();
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{t("shipping_address")}</h1>
        </div>
        <div>
          <label htmlFor="fullName">{t("enter_name_surname")}</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full Name:"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">{t("address")}</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address:"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">{t("city")}</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city:"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">{t("postal_office")}</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postalCode:"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            {t("continue")}
          </button>
        </div>
      </form>
    </div>
  );
}
