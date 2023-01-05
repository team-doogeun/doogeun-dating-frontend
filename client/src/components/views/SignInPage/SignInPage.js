import React, { useCallback } from 'react';
import { useState, useEffet } from 'react';
import { formState } from 'react-hook-form';
import axios from 'axios';
import './SignIn.css';

// 로그인 페이지
function SignInPage() {
  const [token, setToken] = useState('');

  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');

  // 로그인 후
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const [msg, setMsg] = useState('');

  const handleIDChange = (e) => {
    setInputID(e.target.value);
  };

  const handlePWChange = (e) => {
    setInputPW(e.target.value);
  };

  const accessToken = () => {
    axios({
      url: 'http://localhost:8123/accesstoken',
      method: 'GET',
      withCredentials: true,
    });
  };

  // 서버URL에 id, pw 정보 담아서 보내기(post : 생성 및 업데이트)
  const requestSignIn = (e) => {
    e.preventDefault();

    axios({
      // 서버 url에 요청
      url: 'http://localhost:8123/SignIn',
      method: 'POST',
      withCredentials: true,
      data: {
        inputID: inputID,
        inputPW: inputPW,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // 3000 : Home
          window.open('http://localhost:3000', '_self');
        }
      })
      .catch((e) => {
        alert('아이디 또는 비밀번호가 옳지 않습니다');
        // 3000/SignIn : SignIn
        window.open('http://localhost:3000/SignIn', '_self');
      });
  };

  return (
    <div>
      <div className="SignIn">
        <form>
          <div className="InputGroup">
            <label>아이디 : </label>
            <input style={{ margin: 10 }} onChange={handleIDChange} type="text" placeholder="id" id="inputID"></input>
          </div>
          <br />
          <div className="InputGroup">
            <label>비밀번호 : </label>
            <input style={{ margin: 10 }} onChange={handlePWChange} type="password" placeholder="pw" id="inputPW"></input>
          </div>
          <br />
          <div className="InputGroup">
            <button onClick={requestSignIn}>로그인</button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
