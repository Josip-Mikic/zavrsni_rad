import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, listProducts } from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Slideshow from "../components/Slideshow";
import { useRef } from "react";
import Product from "../components/Product";

import { useTranslation } from "react-i18next";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productID = props.match.params.id;
  const productListState = useSelector((state) => state.productList);
  const { loading: loadingList, products: productList } = productListState;
  const productDetails = useSelector((state) => state.productDetails);
  let { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);
  const [majica, setMajica] = useState("");

  const slideRef = useRef();
  const indexRef = useRef(0);
  const changeImage = () => {
    let foundItem = product.images.find(
      (item) => item.atrribute === selectedColor.current.name
    );
    if (foundItem) {
      let index = product.images.indexOf(foundItem);

      indexRef.current = index;
      slideRef.current.goTo(index);
    }
  };
  const [size, setSize] = useState([
    {
      size: "XS",
      quantity: 0,
    },
    {
      size: "S",
      quantity: 0,
    },
    {
      size: "M",
      quantity: 0,
    },
    {
      size: "L",
      quantity: 0,
    },
    {
      size: "XL",
      quantity: 0,
    },
    {
      size: "XXL",
      quantity: 0,
    },
    {
      size: "XXXL",
      quantity: 0,
    },
    {
      size: "XXXXL",
      quantity: 0,
    },
    {
      size: "XXXXXL",
      quantity: 0,
    },
  ]);
  const selectedColor = useRef("nothing");

  useEffect(() => {
    handleChange();
    dispatch(listProducts());
    dispatch(detailsProduct(productID));
  }, [dispatch, productID]);

  const addToCartHandler = () => {
    if (size.length === 0) {
      alert("Odaberite Veličinu");
    } else
      props.history.push(
        `/cart/${productID}?qty=${qty}&size=${majica}&color=${selectedColor.current.name}`
      );
  };
  //Refresh max number in select box
  const loadQuantity = (size) => {
    product.countInStock = selectedColor.current.size.filter(
      (x) => x.size === size
    )[0].quantity;
  };
  var address = "";
  if (loading === false && product) {
    address = `/clothes/${product.gender}/all`;
  }
  let products;
  const rand = useRef([]);
  if (loadingList === false && productList) {
    if (rand.current.length === 0)
      rand.current = [
        parseInt((Math.random() * 100) % productList.length),
        parseInt((Math.random() * 100) % productList.length),
        parseInt((Math.random() * 100) % productList.length),
      ];

    products = rand.current.map((number) => (
      <Product key={Date.now() + Math.random()} product={productList[number]} />
    ));
  }
  const handleChange = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { t } = useTranslation();
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to={address}>
            {" "}
            <i
              className="fa fa-chevron-left back-button fa-4x"
              aria-hidden="true"
            ></i>
            {t("back")}
          </Link>
          <div className="row top container-products">
            <div className="col-2  justify-center primjer  ">
              <Slideshow images={product.images} slideref={slideRef} />
            </div>
            <div className="col-1 pd-0-15">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                {/* <li>Opis : {product.description}</li> */}

                <li>
                  <h4>{t("available_colors")}</h4>
                  {product.colors &&
                    product.colors.map((color) => (
                      <div
                        style={{ backgroundColor: color.name }}
                        key={color.name}
                        className={`color-box colored-circle ${
                          selectedColor.current.name === color.name
                            ? "success-checkmark"
                            : ""
                        }`}
                        onClick={() => {
                          selectedColor.current = color;
                          setSize(color.size);
                          changeImage(color);
                        }}
                      ></div>
                    ))}
                </li>
              </ul>
              <div className="card text-small ">
                <ul>
                  <li>
                    <div className="row">{t("price")}</div>
                    <div className="price">{product.price} kn</div>
                  </li>
                  <li>
                    <div className="row">Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">{t("available")}</span>
                      ) : (
                        <span className="danger">{t("unavailable")}</span>
                      )}
                    </div>
                  </li>

                  {size && (
                    <>
                      <li>
                        <div className="row">
                          <div> {t("size_and_quantity")} </div>
                          <div>
                            <select
                              onChange={(e) => {
                                loadQuantity(e.target.value);
                                setMajica(e.target.value);
                              }}
                              defaultValue={t("choose_size")}
                            >
                              <option
                                disabled="disabled"
                                id="error-box"
                                key="2231432"
                              >
                                {t("choose_size")}
                              </option>
                              {size.map((x) => {
                                return (
                                  x.quantity > 0 && (
                                    <option key={x._id}>{x.size}</option>
                                  )
                                );
                              })}
                            </select>

                            {product.countInStock > 0 && (
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            )}
                          </div>
                        </div>
                      </li>
                      {
                        <li>
                          <button
                            onClick={addToCartHandler}
                            className="primary block"
                            disabled={product.countInStock ? false : true}
                          >
                            {t("add_to_cart")}
                          </button>
                        </li>
                      }
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h1>Preporučamo</h1>
                <div className="flex column-mobile align-center">
                  {" "}
                  {products}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
