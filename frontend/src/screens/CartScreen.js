import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function CartScreen(props) {
  const productID = props.match.params.id;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1].split("&")[0])
    : 1;
  const size = props.location.search
    ? props.location.search.split("=")[2].split("&")[0]
    : "nosize";
  const color = props.location.search
    ? props.location.search.split("=")[3]
    : "nocolor";
  const dispatch = useDispatch();
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty, size, color));
    }
  }, [color, dispatch, productID, qty, size]);

  const removeFromCartHandler = (id, productColor) => {
    dispatch(removeFromCart(id, productColor));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
    //delete action
  };
  const { t } = useTranslation();
  return (
    <div className="row top">
      <div className="col-2">
        <h1 className="font-awesome-3">{t("cart")}</h1>
        {cartItems.length === 0 ? (
          <h2>
            <MessageBox>
              {t("cart_is_empty")}{" "}
              <Link to="/homescreen">{t("go_shopping")} </Link>
            </MessageBox>
          </h2>
        ) : (
          <ul>
            {cartItems &&
              cartItems.map((item) => (
                <li key={item.product + item.selectedColor}>
                  <div className="container-cartitem ">
                    <div>
                      <img
                        src={item.images[0].name}
                        alt={item.name}
                        className="small"
                      />
                    </div>
                    <div className=" text-medium  font-awesome-1 product-name-small">
                      <Link
                        className="primary-color"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex align-center justify-center">
                      <div
                        className="colored-circle"
                        style={{ backgroundColor: item.selectedColor }}
                      ></div>
                      <div> {item.selectedSize}</div>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(
                              item.product,
                              Number(e.target.value),
                              item.selectedSize,
                              item.selectedColor
                            )
                          );
                        }}
                      >
                        {" "}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" text-small  ">{item.price} Kn</div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCartHandler(
                            item.product,
                            item.selectedColor
                          )
                        }
                      >
                        X
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="col-1 p-1">
        <div className="cart cart-body">
          <ul>
            <li>
              <h2 className="text-center">
                {t("total")} ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                {t("articles")}:
                {cartItems.reduce((a, c) => a + c.qty * c.price, 0)} Kn)
              </h2>
            </li>
            <li>
              <button
                className="primary block "
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                {t("calculate_shipping")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
