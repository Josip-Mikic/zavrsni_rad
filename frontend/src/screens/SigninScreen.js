import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useTranslation } from "react-i18next";
export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    // TODO: signin action
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);
  const { t } = useTranslation();
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> {t("sign_in")}</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">{t("enter_email")}</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {t("sign_in")}
          </button>
        </div>
        <div>
          <label />
          <div className="text-extrasmall">
            {t("new_customer")}{" "}
            <Link to={`/register?redirect=${redirect}`}>
              {t("create_account")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
