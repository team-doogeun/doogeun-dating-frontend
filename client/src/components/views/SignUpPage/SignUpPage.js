import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function SignUpPage() {
  const dispatch = useDispatch();

  // ID, PW, NickName(닉네임)
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [name, setName] = useState('');

  // <Tag>
  // Radio Btn : character, drink, smoke
  // DropDown : age, department(학과),
  // popUp : look(외모), hobby

  // KakaoID, StudentID(학번), Priorities
  const [kakaoID, setKakaoID] = useState('');
  const [StudentID, setStudentID] = useState('');
  const [priorities, setPriorites] = useState('');

  const onIDHandler = (event) => {
    setInputID(event.currentTarget.value);
  };

  const onPWHandler = (event) => {
    setInputPW(event.currentTarget.value);
  };

  const onConfirmPWHandler = (event) => {
    setConfirmPW(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onKakaoIDHandler = (event) => {
    setKakaoID(event.currentTarget.value);
  };

  const onStudentIDHandler = (event) => {
    setStudentID(event.currentTarget.value);
  };

  const onPriorHandler = (event) => {
    setPriorites(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (inputPW !== confirmPW) {
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다');
    }

    // dispatch(register(body)).then((response) => {
    //   if (response.payload.success) {
    //     // DB에 데이터 저장
    //   } else {
    //     alert('Error');
    //   }
    // });
  };

  // 아이디, 비번, 비번확인, 닉네임
  // 카카오 아이디, 학번, 우선순위
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>ID</label>
        <input placeholder="@konkuk.ac.kr" type="email" value={inputID} onChange={onIDHandler}></input>
        <label>PW</label>
        <input type="password" value={inputPW} onChange={onPWHandler}></input>
        <label>ConfirmPW</label>
        <input type="password" value={confirmPW} onChange={onConfirmPWHandler}></input>
        <label>NickName</label>
        <input type="text" value={name} onChange={onNameHandler}></input>
        <label>KakoID</label>
        <input type="text" value={kakaoID} onChange={onKakaoIDHandler}></input>
        <label>StudentID</label>
        <input type="text" value={StudentID} onChange={onStudentIDHandler}></input>
        <label>Priority</label>
        <input type="text" value={priorities} onChange={onPriorHandler}></input>
      </form>
    </div>
  );
}

export default SignUpPage;
