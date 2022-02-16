import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { useTranslation } from "react-i18next";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch user profile
    if (password !== confirmPassword) {
      alert("Lozinke se ne podudaraju");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <form
        className="form"
        action=""
        id="profile-form"
        onSubmit={submitHandler}
      >
        <div>
          <h1 className="padding-noside">{t("profile")}</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                {t("profile_updated_successfully")}
              </MessageBox>
            )}

            <div>
              <label htmlFor="name">Ime</label>

              <input
                id="name"
                type="text"
                placeholder={t("enter_name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">{t("email")}</label>

              <input
                id="email"
                type="email"
                placeholder={t("enter_email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">{t("password")}</label>

              <input
                id="password"
                type="password"
                placeholder={t("password")}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">{t("repeat_password")}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder={t("repeat_password")}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                {" "}
                {t("update")}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
