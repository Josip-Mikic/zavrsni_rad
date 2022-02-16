import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  return (
    <div className="container row center">
      <Link to="/clothes/female/all">
        <div className="hvrbox">
          <img
            src="images/p1.jpg"
            alt=""
            className="hvrbox-layer_bottom homescreen-images"
          />
          <div className="hvrbox-layer_top">
            <div className="hvrbox-text text-extralarge font-awesome-1">
              {t("for_her")}
            </div>
          </div>
        </div>
      </Link>
      <Link to="/clothes/male/all">
        <div className="hvrbox">
          <img
            src="images/p2.jpg"
            alt=""
            className="hvrbox-layer_bottom homescreen-images"
          />
          <div className="hvrbox-layer_top">
            <div className="hvrbox-text text-extralarge font-awesome-1">
              {t("for_him")}
            </div>
          </div>
        </div>
      </Link>
      <Link to="/clothes/kids/all">
        <div className="hvrbox">
          <img
            src="images/p3.jpg"
            alt=""
            className="hvrbox-layer_bottom homescreen-images"
          />
          <div className="hvrbox-layer_top">
            <div className="hvrbox-text text-extralarge font-awesome-1">
              {t("for_kids")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
