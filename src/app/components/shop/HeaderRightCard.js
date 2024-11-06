"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import TopCart from "./TopCart";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import { altLocalStore } from "../utils/Action/localStoreAction";
import CstActionItem from "../../../Components/EsAction/CstActionItem";

const HeaderRightCard = ({ text = "", cart, ...porps }) => {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onToggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const onLoginAction = async (user) => {
    const login = await signIn("credentials", {
      username: user.username,
      password: user.password,
      redirect: false,
    });

    if (!isEmptyOrNull(login)) {
      if (login.ok) {
        setIsLoginOpen(false);
      }

      if (!isEmptyOrNull(login.error)) {
        setLoginError(login.error);
      }
    }
  };
  
  const onLoginFailedAction = (values) => {
    //esBackLogger.info("onLoginFailed ", values);
  };

  return (
    <React.Fragment>
      <div className="w-full">
        {/* <div className="text-white"></div> */}
        <div className="text-white flex flex-row justify-end items-center box-border">
          <div className="w-10">
            <CstActionItem actionUrl="/cart">C</CstActionItem>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

HeaderRightCard.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightCard);
