import React, { useCallback } from 'react';
import { useState, useEffet } from 'react';
import { formState } from 'react-hook-form';

function SignInPage() {
  const [token, setToken] = useState('');
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const [tokenExpirationDate, setTokenExpirationDate] = useState('');

  const [msg, setMsg] = useState('');

  const handleIDChange = (e) => {
    setInputID(e.target.value);
  };

  const handlePWChange = (e) => {
    setInputPW(e.target.value);
  };

  const SignInFunc = (e) => {
    e.preventDefault();
  };

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    // 3번째 매개변수가 비어있을시, 초깃값 1시간 설정

    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 60 * 1000 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  // expiration이 1시간이 지났다면, jwt의 유효시간도 만료되었기에
  // application에서 제거되야됨
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    // localstorage는 나중에 수정
    localStorage.removeItem('user');
  }, []);

  let logoutTimer = useEffet(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <div>
      <h1>SignInPage</h1>
      <form onSubmit={SignInFunc}>
        <label>아이디 : </label>
        <input onChange={handleIDChange} type="text" id="inputID"></input>
        <br />
        <label>비밀번호 : </label>
        <input onChange={handlePWChange} type="password" id="inputPW"></input>
        <br />
        <button type="submit">로그인</button>
        <br />
      </form>
    </div>
  );
}

//login시 토큰을 받아오는 로직
const authSubmitHandler = async (e) => {
  try {
    const responseData = await sendRequest(
      'http://localhost:3000/SignIn',
      'POST',
      JSON.stringify({
        id: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }),
      {
        'Content-Type': 'application/json',
      }
    );

    // responseData는 userId, email, token을 반환
    // login 함수는 3개의 인수를 받음
    // 3번째 인자(token)을 입력하지 않으면 함수 내부에서 expiration date를 생성하도록 작성함
    login(responseData.userId, responseData.token);
    naviagte('/');
  } catch (err) {}
};

export default SignInPage;
