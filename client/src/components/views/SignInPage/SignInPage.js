import React, { useCallback } from 'react';
import { useState, useEffet } from 'react';
import { formState } from 'react-hook-form';
import axios from 'axios';

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

  // 서버URL에 id, pw 정보 담아서 보내기(post)
  const requestSignIn = async (id, pw) => {
    return await axios
      .post(
        // axios post 알아야됨
        `/login/`,
        { id: id, password: pw },
        { withCredentials: true }
      )
      .then((response) => {
        // token이 필요한 api 요청 시 header Authorization에 token 담아서 보내기
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;
        return response.data;
      })
      .catch((e) => {
        console.log(e.response.data);
        return '아이디 혹은 비밀번호를 확인하세요.';
      });
  };

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

export default SignInPage;
