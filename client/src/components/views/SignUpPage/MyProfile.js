import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { loginUser } from "../../../_actions/user_action";
import "./MyProfile.css";
import { ageData } from "./AttributeData";
import DetailProfile from "./DetailProfile";
import { useNavigate } from "react-router-dom";
import NextPopupModal from "../SmallComponent/NextPopupModal/NextPopupModal";
import ModalComponent from "../SmallComponent/ModalComponent";

// 회원가입 페이지
function MyProfile(props) {
  // 회원가입 입력요소
  // ID
  const [id, setID] = useState("");
  const [idMsg, setIDMsg] = useState("");
  const [isID, setIsID] = useState(false);

  // PW
  const [pw, setPW] = useState("");
  const [pwMsg, setPWMsg] = useState("");
  const [isPW, setIsPW] = useState(false);

  // pwConfirm
  const [confirmPW, setConfirmPW] = useState("");
  const [confirmPWMsg, setConfirmPWMsg] = useState("");
  const [isConfirmPW, setIsConfirmPW] = useState(false);

  // 이름 설정
  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [isName, setIsName] = useState(false);

  // 성별 : 배열로 관리(필터링 필요)
  const [gender, setGender] = useState([]);
  const [manChecked, setManChecked] = useState(false);
  const [womanChecked, setWomanChecked] = useState(false);

  // 나이(dropdown)
  // 드롭다운 기능 : 다른 곳 클릭했을 시 자동으로 사라짐
  const [age, setAge] = useState(null);

  // email(@konkuk.ac.kr 필수입력)
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  // studentID
  const [studentID, setStudentID] = useState("");
  const [studentIDMsg, setStudentIDMsg] = useState("");
  const [isStudentID, setIsStudentID] = useState(false);

  // kakaoID
  const [kakaoID, setKakaoID] = useState("");
  const [kakaoIDMsg, setKakaoMSg] = useState("");
  const [isKakaoID, setIsKakaoID] = useState(false);

  // useEffect(() => {
  //   let pageValid =
  //     isID && isPW && isConfirmPW && isEmail && isName && isStudentID;
  //   if (pageValid) {
  //   }
  // }, [pageValid]);

  // 입력함수
  const onIDHandler = (e) => {
    const nowID = e.currentTarget.value;
    setID(nowID);

    if (nowID.length < 5) {
      setIDMsg("5글자 이상 입력해주세요.");
      setIsID(false);
      localStorage.setItem("id", "");
    } else {
      setIDMsg("올바른 형식입니다.");
      setIsID(true);
      localStorage.setItem("id", nowID);
    }
  };

  const onPWHandler = (e) => {
    // Regex : 입력규칙 -> 숫자+영문자+특수문자 조합으로 8자리 이상
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const nowPW = e.currentTarget.value;
    setPW(nowPW);

    if (pwRegex.test(nowPW)) {
      console.log(pwRegex.test(nowPW));
      setPWMsg("안전한 비밀번호에요.");
      setIsPW(true);
      localStorage.setItem("pw", nowPW);
    } else {
      setPWMsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPW(false);
      localStorage.setItem("pw", "");
    }
  };

  const onConfirmPWHandler = (e) => {
    const nowPWConfirm = e.currentTarget.value;
    setConfirmPW(nowPWConfirm);

    if (pw === nowPWConfirm) {
      setConfirmPWMsg("똑같은 비밀번호입니다.");
      setIsConfirmPW(true);
      localStorage.setItem("confirmPW", nowPWConfirm);
    } else {
      setConfirmPWMsg("비밀번호가 다릅니다!");
      setIsConfirmPW(false);
      localStorage.setItem("confirmPW", "");
    }
  };

  const onNameHandler = (e) => {
    const nowName = e.currentTarget.value;
    setName(nowName);

    if (nowName.length < 2 || nowName.length > 10) {
      setNameMsg("2글자 이상 10글자 미만으로 입력해주세요.");
      setIsName(false);
      localStorage.setItem("name", "");
    } else {
      setNameMsg("올바른 형식입니다.");
      setIsName(true);
      localStorage.setItem("name", nowName);
    }
  };

  const onGenderHandler = (e) => {
    const nowGender = e.currentTarget.value;
    setGender(nowGender);
    localStorage.setItem("gender", nowGender);
  };

  const onEmailHandler = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const nowEmail = e.currentTarget.value;
    setEmail(nowEmail);

    if (!emailRegex.test(nowEmail)) {
      setEmailMsg("이메일 형식이 틀렸어요! 다시 확인해주세요.");
      setIsEmail(false);
      localStorage.setItem("email", "");
    } else {
      setEmailMsg("올바른 이메일 형식이에요:)");
      setIsEmail(true);
      localStorage.setItem("email", nowEmail);
    }
  };

  const onStudentIDHandler = (e) => {
    const nowStudentID = e.currentTarget.value;
    setStudentID(nowStudentID);
    const shortID = nowStudentID.substr(2, 2);
    const isNum = nowStudentID.substr(nowStudentID.length - 1, 1);

    if (nowStudentID.length !== 9) {
      setStudentIDMsg("학번은 9자리입니다!");
      setIsStudentID(false);
      localStorage.setItem("studentID", "");
    } else {
      setStudentIDMsg(`${shortID}학번이시네요 반갑습니다!`);
      setIsStudentID(true);
      localStorage.setItem("studentID", nowStudentID);
    }

    if (isNaN(isNum)) {
      setStudentIDMsg("숫자만 입력해주세요.");
      setIsStudentID(false);
      localStorage.setItem("studentID", "");
    }
  };

  const onKakaoIDHandler = (e) => {
    const nowKakaoID = e.currentTarget.value;
    setKakaoID(nowKakaoID);
    setKakaoMSg("매칭시 교환되는 아이디입니다.\n신중하게 입력해주세요.");
    localStorage.setItem("kakaoID", nowKakaoID);
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
      localStorage.getItem(key) !== "" ? localStorage.getItem(key) : value;
    return val;
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
            <div className={`message ${isID ? "success" : "error"}`}>
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
            <div className={`message ${isPW ? "success" : "error"}`}>
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
            <div className={`message ${isConfirmPW ? "success" : "error"}`}>
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
            <div className={`message ${isName ? "success" : "error"}`}>
              {nameMsg}
            </div>
          )}

          <div className="genderContainer">
            <input
              type="checkbox"
              class="btn-check checked"
              id="btn-check-outlined"
              autocomplete="off"
              value="남자"
              checked={gender === "남자"}
              onClick={onGenderHandler}
            />
            <label class="btn btn-outline-primary" for="btn-check-outlined">
              남자
            </label>
            <div className="marginBetween"></div>
            <input
              type="checkbox"
              class="btn-check checked"
              id="danger-outlined"
              autocomplete="off"
              value="여자"
              checked={gender === "여자"}
              onClick={onGenderHandler}
            />
            <label class="btn btn-outline-danger" for="danger-outlined">
              여자
            </label>
          </div>

          <Select
            className="ageDropDown"
            value={age}
            onChange={(age) => {
              setAge(age.value);
              localStorage.setItem("age", age.value);
            }}
            options={ageData}
            placeholder={"나이"}
          />

          <input
            onChange={onEmailHandler}
            type="text"
            placeholder="@konkuk.ac.kr"
            value={email}
          ></input>
          {email.length > 0 && (
            <div className={`message ${isEmail ? "success" : "error"}`}>
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
            <div className={`message ${isStudentID ? "success" : "error"}`}>
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

          <ModalComponent
            mainContent="NextPage"
            contentName="다음"
            header="알림"
            nextPage="detailprofile"
          />
        </div>
      </div>
    </div>
  );
}

export { MyProfile as default };
