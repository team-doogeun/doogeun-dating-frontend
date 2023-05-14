import axios from "axios";
import SignInView from "./SignInView";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingInContainer = () => {
  const navigator = useNavigate();
  const [loginError, setLoginError] = useState({});
  const loginSubmit = async (values) => {
    const { email, password } = values;
    try {
      await axios
        .post("http://localhost:8080/user/login", {
          email,
          password,
        })
        .then((res) => {
          setLoginError({});
          if (
            window.location.pathname === "/select" ||
            window.location.pathname === "/signup"
          )
            console.log("hello");
          else window.location.reload();
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

export default SingInContainer;
