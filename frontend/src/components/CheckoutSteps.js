import React from "react";

import { useTranslation } from "react-i18next";
export default function CheckoutSteps(props) {
  const { t } = useTranslation();
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>{t("login")}</div>
      <div className={props.step2 ? "active" : ""}>{t("delivery")}</div>
      <div className={props.step3 ? "active" : ""}>{t("payment")}</div>
      <div className={props.step4 ? "active" : ""}>{t("order")}</div>
    </div>
  );
}
