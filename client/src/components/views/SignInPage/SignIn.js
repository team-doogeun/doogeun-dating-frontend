import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { useLogin } from "../../Api/useLogin";

// 로그인 모달 폼에 뜨는 곳
function SignIn(props) {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");

  const onIDHandler = (e) => {
    setInputID(e.currentTarget.value);
  };

  const onPWHandler = (e) => {
    setInputPW(e.currentTarget.value);
  };

  const loginMutation = useLogin();

  const handleLogin = async () => {
    const { data, error } = await loginMutation.mutateAsync({
      inputID,
      inputPW,
    });

    if (error) {
      // handle error
      alert(`${error.message}`);
    } else {
      // handle success
      console.log(data);
    }
  };

  return (
    <div className="SignIn">
      <form className="SignInForm" onSubmit={handleLogin}>
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
            // onClick={}
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
