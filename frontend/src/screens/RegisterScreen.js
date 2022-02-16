import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useTranslation } from "react-i18next";
export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error } = userRegister;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm passwords do not match!");
    } else {
      dispatch(register(name, email, password));
      localStorage.removeItem("userInfo");
    }
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
          <h1>{t("register")}</h1>
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
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">{t("password")} </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">{t("repeat_password")}</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            {t("register")}
          </button>
        </div>
        <div>
          <label />
          <div>
            {t("already_a_customer")}{" "}
            <Link to={`/signin?redirect=${redirect}`}>{t("sign_in")}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
