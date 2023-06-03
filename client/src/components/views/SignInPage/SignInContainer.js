import axios from "axios";
import SignInView from "./SignInView";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, setCookieExpires } from "../../Api/loginApi";
const SignInContainer = () => {
  const navigator = useNavigate();
  const [loginError, setLoginError] = useState({});
  const loginSubmit = async (values) => {
    const { userId, password } = values;
    try {
      await axios
        .post("http://localhost:8080/users/login", {
          userId,
          password,
        })
        .then((res) => {
          setCookieExpires("sessionId", res.data.sessionId);
          setCookie("name", res.data.name);
          setCookie("userId", res.data.userId);
          if (
            window.location.pathname === "/myprofile" ||
            window.location.pathname === "/detailprofile"
          )
            navigator("/");
          else window.location.reload();
          setLoginError({});
        });
    } catch (e) {
      setLoginError({
        errorMessage: "이메일 또는 비밀번호를 다시 확인해주세요.",
      });
    }
  };

  return (
    <SignInView
      loginSubmit={loginSubmit}
      loginError={loginError}
      navigator={navigator}
    />
  );
};

export default SignInContainer;
