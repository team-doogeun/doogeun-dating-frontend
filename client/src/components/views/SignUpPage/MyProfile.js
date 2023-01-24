import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import './MyProfile.css';

// 회원가입 페이지
function MyProfile(props) {
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

  // 나이(dropdown)
  // 드롭다운 기능 : 다른 곳 클릭했을 시 자동으로 사라짐
  const [age, setAge] = useState('');
  const ageRange = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'];
  const ageOptions = ageRange.map((value) => {
    return <option value={value}>{value}</option>;
  });
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

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

  // 입력함수
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
      setPWMsg('안전한 비밀번호에요.');
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
      setConfirmPWMsg('똑같은 비밀번호입니다.');
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
    // currentTargetValue -> 부모 tag까지 불러옴
    // targetValue -> 자식 tag만 불러옴
    setGender(e.target.value);
  };

  const onAgeHandler = (e) => {
    setAge(e.target.value);
  };

  const onEmailHandler = (e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg('이메일 형식이 틀렸어요! 다시 확인해주세요.');
      setIsEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식이에요:)');
      setIsEmail(true);
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
    }

    if (isNaN(isNum)) {
      setStudentIDMsg('숫자만 입력해주세요.');
      setIsStudentID(false);
    }
  };

  const onKakaoIDHandler = (e) => {
    setKakaoID(e.currentTarget.value);
    setKakaoMSg('매칭시 교환되는 아이디입니다.\n신중하게 입력해주세요.');
  };

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
    <div className="MyProfilePage" id="MyProfile">
      <form className="MyProfileForm" onSubmit={onSubmitHandler}>
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
            <label className="genderCheck1">
              <input type="radio" id="man" name="gender" value="남자" checked={gender === '남자'} onChange={onGenderHandler}></input>
              남자
            </label>
            <label className="genderCheck2">
              <input type="radio" id="woman" name="gender" value="여자" checked={gender === '여자'} onChange={onGenderHandler}></input>
              여자
            </label>
          </div>

          <div className="ageDropDown" ref={dropDownRef}>
            <select
              value={age}
              placeholder="나이"
              className="selectAge"
              onClick={(e) => {
                setIsOpen(!isOpen);
              }}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            >
              {ageOptions}
            </select>
          </div>

          <input onChange={onEmailHandler} value={email} type="text" placeholder="@konkuk.ac.kr"></input>
          {email.length > 0 && <div className={`message ${isEmail ? 'success' : 'error'}`}>{emailMsg}</div>}

          <input onChange={onStudentIDHandler} value={studentID} type="text" placeholder="학번"></input>
          {studentID.length > 0 && <div className={`message ${isStudentID ? 'success' : 'error'}`}>{studentIDMsg}</div>}

          <input onChange={onKakaoIDHandler} value={kakaoID} type="text" placeholder="카카오ID"></input>
          {kakaoID.length > 0 && <div className="kakaoIDMsg">{kakaoIDMsg}</div>}

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

const useDetectClose = (ref, initialState) => {
  // initialState : true, false
  const [isOpen, setIsOpen] = useState(initialState);

  // 사용자가 클릭한 요소(ref.current)
  // 안의 요소(ref.current.contains(e.target)인지 확인 후 닫아주는 구조
  // -> dropdown에 적용해보자면 dropdown(ref.current) 누르고
  // 포함된 요소 ex) 22 (ref.current.contains)를 누르면 닫아줌
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) window.addEventListener('click', pageClickEvent);

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export { MyProfile as default, useDetectClose };
