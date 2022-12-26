import React from 'react';
import { useState, useEffet } from 'react';

function SignInPage() {
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');

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
