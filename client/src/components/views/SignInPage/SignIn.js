import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { formState } from 'react-hook-form';
import axios from 'axios';
import './SignIn.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

// 로그인 모달 폼에 뜨는 곳
function SignIn(props) {
  const [token, setToken] = useState('');

  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');

  // 로그인 후
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const [msg, setMsg] = useState('');

  // const disptach = useDispatch();

  const onIDHandler = (e) => {
    setInputID(e.currentTarget.value);
  };

  const onPWHandler = (e) => {
    setInputPW(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // API 명세서 참고
    let body = {
      userid: inputID,
      password: inputPW,
    };

    // disptach(loginUser(body)).then((response) => {
    //   if (response.payload.loginSuccess) {
    //     props.history.push('/');
    //   } else {
    //     alert('error');
    //   }
    // });
  };

  const accessToken = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8123/accesstoken',
      withCredentials: true,
    });
  };

  // 서버URL에 id, pw 정보 담아서 보내기(post : 생성 및 업데이트)
  const requestSignIn = (e) => {
    e.preventDefault();

    axios({
      // 서버 url에 요청
      url: 'http://localhost:8123/signin',
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
        // SignIn이 모달창이니 Home페이지가 뜨게 설정
        window.open('http://localhost:3000', '_self');
      });
  };

  return (
    <div className="SignIn">
      <form className="SignInForm">
        <div className="InputGroup">
          <input className="InputID" onChange={onIDHandler} value={inputID} type="text" placeholder="아이디" id="inputID"></input>
          <input className="InputPW" onChange={onPWHandler} value={inputPW} type="password" placeholder="비밀번호" id="inputPW"></input>
          <button className="SignInButton" type="submit" onClick={requestSignIn}>
            로그인
          </button>
          <button className="SignUpButton">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
