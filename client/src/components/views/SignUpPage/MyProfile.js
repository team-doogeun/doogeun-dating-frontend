import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { loginUser } from '../../../_actions/user_action';
import './MyProfile.css';
import { ageRangeData } from './AttributeData';
import DetailProfile from './DetailProfile';
import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import IdealTypeProfile from './IdealTypeProfile';

// 회원가입 페이지
function MyProfile(props) {
  <Routes>
    <Route path="/" element={<MyProfile />}></Route>
    <Route path="/detail" element={<DetailProfile />}></Route>
    <Route path="/ideal" element={<IdealTypeProfile />}></Route>
  </Routes>;

  // 회원가입 입력요소(기본)
  // id, pw, pw확인, name, gender, age, email(학교)
  // studentId(학번), externalId(카카오 아이디)
  let navigation = useNavigate();

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

  // 나이(dropdown)
  // 드롭다운 기능 : 다른 곳 클릭했을 시 자동으로 사라짐
  const [age, setAge] = useState('나이');

  // email(@konkuk.ac.kr 필수입력)
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  // studentID
  const [studentID, setStudentID] = useState('');
  const [studentIDMsg, setStudentIDMsg] = useState('');
  const [isStudentID, setIsStudentID] = useState(false);

  // kakaoID
  const [kakaoID, setKakaoID] = useState('');
  const [kakaoIDMsg, setKakaoMSg] = useState('');
  const [isKakaoID, setIsKakaoID] = useState(false);

  // useEffect(() => {
  //   let pageValid =
  //     isID && isPW && isConfirmPW && isEmail && isName && isStudentID;
  //   if (pageValid) {
  //   }
  // }, [pageValid]);

  // 지웠을 때 문제가 생긴다

  // 입력함수
  const onIDHandler = (e) => {
    setID(e.currentTarget.value);
    localStorage.setItem('id', id);
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
      setPWMsg('안전한 비밀번호에요.');
      setIsPW(true);
      localStorage.setItem('pw', pw);
    } else {
      setPWMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPW(false);
    }
  };

  const onConfirmPWHandler = (e) => {
    const pwConfirmCurrent = e.currentTarget.value;
    setConfirmPW(pwConfirmCurrent);

    if (pw == pwConfirmCurrent) {
      setConfirmPWMsg('똑같은 비밀번호입니다.');
      setIsConfirmPW(true);
      localStorage.setItem('confirmPW', confirmPW);
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
      localStorage.setItem('name', name);
    }
  };

  const onGenderHandler = (e) => {
    // currentTargetValue -> 부모 tag까지 불러옴 -> 길어서 부모까지 불러옴
    // targetValue -> 자식 tag만 불러옴
    setGender(e.target.value);
  };

  const onEmailHandler = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg('이메일 형식이 틀렸어요! 다시 확인해주세요.');
      setIsEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식이에요:)');
      setIsEmail(true);
      localStorage.setItem('email', email);
    }
  };

  const onStudentIDHandler = (e) => {
    const currentStudentID = e.target.value;
    setStudentID(currentStudentID);
    const shortID = currentStudentID.substr(2, 2);
    const isNum = currentStudentID.substr(currentStudentID.length - 1, 1);

    if (currentStudentID.length !== 9) {
      setStudentIDMsg('학번은 9자리입니다!');
      setIsStudentID(false);
    } else {
      setStudentIDMsg(`${shortID}학번이시네요 반갑습니다!`);
      setIsStudentID(true);
      localStorage.setItem('studentID', studentID);
    }

    if (isNaN(isNum)) {
      setStudentIDMsg('숫자만 입력해주세요.');
      setIsStudentID(false);
    }
  };

  const onKakaoIDHandler = (e) => {
    setKakaoID(e.currentTarget.value);
    setKakaoMSg('매칭시 교환되는 아이디입니다.\n신중하게 입력해주세요.');
    localStorage.setItem('kakaoID', kakaoID);
  };

  let MyProfileData = {
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

  const localStorageGetItem = (key, value) => {
    const val =
      localStorage.getItem(key) !== '' ? localStorage.getItem(key) : value;
    return val;
  };

  const onSubmitHandler = (e) => {
    // register action 부분을 여기에 미리 작성
  };

  const [content, setContent] = useState('');
  const selectComponent = {
    DP: <DetailProfile />,
  };

  return (
    <div className="MyProfilePage" id="MyProfile">
      <div className="MyProfileForm">
        <div className="MyProfileInputs">
          <input
            onChange={onIDHandler}
            placeholder="아이디"
            value={id}
            type="text"
          ></input>
          {id.length > 0 && (
            <div className={`message ${isID ? 'success' : 'error'}`}>
              {idMsg}
            </div>
          )}

          <input
            onChange={onPWHandler}
            placeholder="비밀번호"
            value={pw}
            type="password"
          ></input>
          {pw.length > 0 && (
            <div className={`message ${isPW ? 'success' : 'error'}`}>
              {pwMsg}
            </div>
          )}

          <input
            onChange={onConfirmPWHandler}
            placeholder="비밀번호 확인"
            value={confirmPW}
            type="password"
            id="confirmPW"
          ></input>
          {confirmPW.length > 0 && (
            <div className={`message ${isConfirmPW ? 'success' : 'error'}`}>
              {confirmPWMsg}
            </div>
          )}

          <input
            onChange={onNameHandler}
            placeholder="이름"
            value={name}
            type="text"
          ></input>
          {name.length > 0 && (
            <div className={`message ${isName ? 'success' : 'error'}`}>
              {nameMsg}
            </div>
          )}

          <div className="RadioButtonGroup">
            <label className="genderCheck1">
              <input
                type="radio"
                id="man"
                name="gender"
                value="남자"
                checked={gender === '남자'}
                onChange={onGenderHandler}
              ></input>
              남자
            </label>
            <label className="genderCheck2">
              <input
                type="radio"
                id="woman"
                name="gender"
                value="여자"
                checked={gender === '여자'}
                onChange={onGenderHandler}
              ></input>
              여자
            </label>
          </div>

          <Select
            className="ageDropDown"
            options={ageRangeData}
            placeholder={'나이'}
          />

          <input
            onChange={onEmailHandler}
            type="text"
            placeholder="@konkuk.ac.kr"
            value={email}
          ></input>
          {email.length > 0 && (
            <div className={`message ${isEmail ? 'success' : 'error'}`}>
              {emailMsg}
            </div>
          )}

          <input
            onChange={onStudentIDHandler}
            placeholder="학번"
            value={studentID}
            type="text"
          ></input>
          {studentID.length > 0 && (
            <div className={`message ${isStudentID ? 'success' : 'error'}`}>
              {studentIDMsg}
            </div>
          )}

          <input
            onChange={onKakaoIDHandler}
            placeholder="카카오ID"
            value={kakaoID}
            type="text"
          ></input>
          {kakaoID.length > 0 && <div className="kakaoIDMsg">{kakaoIDMsg}</div>}

          <div className="nextButton">
            <button
              className="footerButton"
              onClick={() => {
                navigation('/detailprofile');
              }}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MyProfile as default };
