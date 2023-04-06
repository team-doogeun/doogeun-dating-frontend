import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { loginUser } from "../../../_actions/user_action";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
// 로그인 모달 폼에 뜨는 곳
function SignIn(props) {
  const [token, setToken] = useState("");

  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");

  // 로그인 후
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const [msg, setMsg] = useState("");

  const onIDHandler = (e) => {
    setInputID(e.currentTarget.value);
  };

  const onPWHandler = (e) => {
    setInputPW(e.currentTarget.value);
  };

  const accessToken = () => {
    axios({
      method: "get",
      url: "http://localhost:8123/accesstoken",
      withCredentials: true,
    });
  };

  // 서버URL에 id, pw 정보 담아서 보내기(post : 생성 및 업데이트)
  // user_action 에서 loginUser에 data를 담는다
  // withCredentials: true -> 나중에 설정
  let data = {
    userId: inputID,
    password: inputPW,
  };

  return (
    <div className="SignIn">
      <form className="SignInForm">
        <div className="InputGroup">
          <input
            className="InputID"
            onChange={onIDHandler}
            value={inputID}
            type="text"
            placeholder="아이디"
            id="inputID"
          ></input>
          <input
            className="InputPW"
            onChange={onPWHandler}
            value={inputPW}
            type="password"
            placeholder="비밀번호"
            id="inputPW"
          ></input>
          <button
            className="SignInButton"
            type="submit"
            onClick={loginUser(data)}
          >
            로그인
          </button>
          <button className="SignUpButton">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
