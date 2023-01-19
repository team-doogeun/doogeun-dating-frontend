import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import './SignUpPage.css';

// 회원가입 페이지
function SignUpPage(props) {
  // const dispatch = useDispatch();

  // 회원가입 입력요소(기본)
  // id, pw, pw확인, name, gender, age, email(학교)
  // studentId(학번), externalId(카카오 아이디)

  // ID
  const [id, setID] = useState('');
  const [idMsg, setIDMsg] = useState('');
  const [isID, setIsID] = useState(false);

  // PW
  const [pw, setPW] = useState('');
  const [pwMsg, setPWMsg] = useState('');
  const [isPW, setIsPW] = useState(false);

  // pwConfirm
  const [confirmPW, setConfirmPW] = useState('');
  const [confirmPWMsg, setConfirmPWMsg] = useState('');
  const [isConfirmPW, setIsConfirmPW] = useState(false);

  // 이름 설정
  const [name, setName] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [isName, setIsName] = useState(false);

  // 성별
  const [gender, setGender] = useState('');

  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [studentID, setStudentID] = useState('');
  const [kakaoID, setKakaoID] = useState('');

  // 마이프로필
  const [detailProfrile, setDetailProfile] = useState({});

  // 이상형프로필
  const [idealTypeProfile, setIdealTypeProfile] = useState({});

  const onIDHandler = (e) => {
    setID(e.currentTarget.value);

    if (e.currentTarget.value.length < 5) {
      setIDMsg('5글자 이상 입력해주세요.');
      setIsID(false);
    } else {
      setIDMsg('올바른 형식입니다.');
      setIsID(true);
    }
  };

  const onPWHandler = (e) => {
    // Regex : 입력규칙 -> 숫자+영문자+특수문자 조합으로 8자리 이상
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const pwCurrent = e.currentTarget.value;
    setPW(pwCurrent);

    if (pwRegex.test(pwCurrent)) {
      console.log(pwRegex.test(pwCurrent));
      setPWMsg('안전한 비밀번호에요');
      setIsPW(true);
    } else {
      setPWMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPW(false);
    }
  };

  const onConfirmPWHandler = (e) => {
    const pwConfirmCurrent = e.currentTarget.value;
    setConfirmPW(pwConfirmCurrent);

    if (pw == pwConfirmCurrent) {
      setConfirmPWMsg('똑같은 비밀번호');
      setIsConfirmPW(true);
    } else {
      setConfirmPWMsg('비밀번호가 다릅니다!');
      setIsConfirmPW(false);
    }
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
    if (e.currentTarget.value.length < 2 || e.currentTarget.value.length > 10) {
      setNameMsg('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMsg('올바른 형식입니다.');
      setIsName(true);
    }
  };

  const onGenderHandler = (e) => {
    console.log(e.currentTarget.value);
    setGender(e.target.value);
  };

  const onAgeHandler = (e) => {
    setAge(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onStudentIDHandler = (e) => {
    setStudentID(e.currentTarget.value);
  };

  const onKakaoIDHandler = (e) => {
    setKakaoID(e.currentTarget.value);
  };

  // 본인 프로필

  // 이상형 프로필

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // API 명세서 참고
    let body = {
      id: id,
      password: pw,
      confirmpassword: confirmPW,
      name: name,
      gender: gender,
      age: age,
      email: email,
      studentId: studentID,
      externalID: kakaoID,
    };
  };

  return (
    <div className="SignUp">
      <form className="SignUpForm" onSubmit={onSubmitHandler}>
        <div className="Inputs">
          <input onChange={onIDHandler} value={id} type="text" placeholder="아이디"></input>
          {id.length > 0 && <div className={`message ${isID ? 'success' : 'error'}`}>{idMsg}</div>}

          <input onChange={onPWHandler} value={pw} type="password" placeholder="비밀번호"></input>
          {pw.length > 0 && <div className={`message ${isPW ? 'success' : 'error'}`}>{pwMsg}</div>}

          <input onChange={onConfirmPWHandler} value={confirmPW} type="password" placeholder="비밀번호 확인" id="confirmPW"></input>
          {confirmPW.length > 0 && <div className={`message ${isConfirmPW ? 'success' : 'error'}`}>{confirmPWMsg}</div>}

          <input onChange={onNameHandler} value={name} type="text" placeholder="이름"></input>
          {name.length > 0 && <div className={`message ${isName ? 'success' : 'error'}`}>{nameMsg}</div>}

          <div className="RadioButtonGroup">
            <label>
              <input type="radio" id="man" name="gender" value="남자" checked={gender === '남자'} onChange={onGenderHandler}></input>
              남자
            </label>
            <label>
              <input type="radio" id="woman" name="gender" value="여자" checked={gender === '여자'} onChange={onGenderHandler}></input>
              여자
            </label>
          </div>

          <input onChange={onAgeHandler} value={age} type="text" placeholder="나이"></input>
          <input onChange={onEmailHandler} value={email} type="text" placeholder="@konkuk.ac.kr"></input>
          <input onChange={onStudentIDHandler} value={studentID} type="text" placeholder="학번"></input>
          <input onChange={onKakaoIDHandler} value={kakaoID} type="text" placeholder="카카오ID"></input>
          <div className="nextButton">
            <button className="footerButton" disabled={!(isID && isPW && isConfirmPW && isName)}>
              다음
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const RadioButtonComponent = (props) => {
  return (
    <>
      <label>
        <input id={props.genderKr} name={props.genderKr} value={props.genderKr} type="radio" checked={props.gender === props.genderKr} onChange={props.handler}></input>
        {props.genderKr}
      </label>
    </>
  );
};

export default SignUpPage;
