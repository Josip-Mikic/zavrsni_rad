import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { deleteCart } from "./actions/cartActions";
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import Images from "./components/Images";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import i18next from "i18next";
import { useState } from "react";
import CategoryEditScreen from "./screens/CategoryEditScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const gender = window.location.pathname.split("/")[2];

  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { userInfo } = userSignin;
  // const categories = [
  //   "Pants",
  //   "Shirts",
  //   "Clothes",
  //   "Shoes",
  //   "Jackets",
  //   "Jeans",
  //   "T_shirt",
  //   "Underwear",
  //   "Pullover",
  //   "Coat",
  //   "Swimsuit",
  //   "Pajamas",
  //   "Dress",
  //   "Long",
  //   "Short",
  // ];
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout);
    dispatch(deleteCart);
  };

  const languages = [
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    {
      code: "hr",
      name: "Croatian",
      country_code: "hr",
    },
  ];
  const GlobeIcon = ({ width = 24, height = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-globe"
      viewBox="0 0 16 16"
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
    </svg>
  );
  const currentLanguageCode = cookies.get("i18next") || "en";

  const { t } = useTranslation();
  const categories = useSelector(
    (state) => state.productCategoryList.categories
  );

  return (
    <BrowserRouter>
      <div className="App ">
        <div className="grid-container">
          <header className="row sticky ">
            <div className="flex ml-9 ">
              <button
                type="button"
                className="open-sidebar"
                onClick={() => {
                  if (window.location.pathname.split("/")[1] !== "clothes") {
                  } else {
                    setSidebarIsOpen(true);
                  }
                }}
              >
                <i className="fa fa-bars"></i>
              </button>
              ;
              <Link to="/">
                <b>
                  <div className="big-text font-awesome-1 text-large ">
                    T.O.Veki
                  </div>
                </b>
              </Link>
            </div>

            <div className="header-right mr-9">
              <Link to="/cart">
                <div id="cart">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItems.length > 0 && (
                    <span className="badge badge-warning">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>

              {userInfo ? (
                <div className="dropdown">
                  <Link to="" className="username-main">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">{t("profile")}</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">{t("order_history")}</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        {t("sign_out")}
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin" className="font-awesome-1 ml-1">
                  {t("sign_in")}
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <div className="pointer">
                    {" "}
                    Admin {"  "} <i className="fa fa-caret-down"></i>
                  </div>

                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist"> {t("products")}</Link>
                    </li>
                    <li>
                      <Link to="/orderlist"> {t("orders")}</Link>
                    </li>
                    <li>
                      <Link to="/userlist">{t("users")}</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>
          <aside className={sidebarIsOpen ? "open" : ""}>
            <ul className="categories">
              <li>
                <h2>Categories</h2>
                <button
                  onClick={() => {
                    //console.log(props);
                    setSidebarIsOpen(false);

                    //props.history.push("/payment");
                  }}
                  className="close-sidebar"
                  type="button"
                >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {/* {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : ( */}
              {categories &&
                categories.map((category) => (
                  <li key={category.name} className={"flex flex-column"}>
                    <Link
                      to={`/clothes/${gender}/${category.name}`}
                      className={`category `}
                      onClick={() => {
                        setSidebarIsOpen(false);
                      }}
                    >
                      {category.name}
                    </Link>

                    {category.subcategories.map((subcategory) => (
                      <Link
                        to={`/clothes/${gender}/${subcategory}`}
                        className="category tab fs-15 "
                        key={subcategory + Date.now()}
                        onClick={() => {
                          setSidebarIsOpen(false);
                        }}
                      >
                        <p>{subcategory}</p>
                      </Link>
                    ))}
                  </li>
                  // <li key={category}>
                  //   <Link
                  //     to={`/clothes/${gender}/${category}`}
                  //     className={`category ${
                  //       category === "Clothes" || category === "Shoes"
                  //         ? "fs-20"
                  //         : "tab fs-15"
                  //     }`}
                  //     onClick={() => {
                  //       setSidebarIsOpen(false);
                  //     }}
                  //   >
                  //     {category}
                  //   </Link>
                  // </li>
                ))}
            </ul>
          </aside>

          <main className="width-83">
            {/* All users allowed */}
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/" component={WelcomeScreen} exact></Route>
            {/* <Route path="/female" component={HomeScreen} exact></Route>
            <Route path="/male" component={HomeScreen} exact></Route>
            <Route path="/kids" component={HomeScreen} exact></Route> */}

            <Route
              path="/clothes/:gender/:categories"
              component={HomeScreen}
            ></Route>

            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/edit/category" component={CategoryEditScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/homescreen" component={HomeScreen}></Route>
            <Route path="/editImages/:id" component={Images}></Route>

            {/* Only logged in */}
            <PrivateRoute
              path="/orderhistory"
              component={OrderHistoryScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/order/:id"
              component={OrderScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/placeorder"
              component={PlaceOrderScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/shipping"
              component={ShippingAddressScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            {/* Admin users only */}
            <AdminRoute
              path="/product/:id/edit"
              component={ProductEditScreen}
            ></AdminRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/userlist"
              component={UserListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
            ></AdminRoute>
          </main>
          <footer className="row center font-awesome-2 text-small">
            {t("all_rights_reserved")}
            <div className="dropdown ml-3">
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <GlobeIcon />
              </button>
              <ul
                className="dropdown-content"
                aria-labelledby="dropdownMenuButton1"
              >
                {languages.map(({ code, name, country_code }) => (
                  <li key={country_code}>
                    <button
                      className="dropdown-item"
                      disabled={currentLanguageCode === code}
                      onClick={() => {
                        i18next.changeLanguage(code);
                      }}
                    >
                      <span
                        className={`flag-icon flag-icon-${country_code} mx-2`}
                        style={{
                          opacity: currentLanguageCode === code ? 0.5 : 1,
                        }}
                      ></span>
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
