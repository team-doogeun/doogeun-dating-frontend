import React, { createContext, useEffect, useState } from "react";
import "./IdealProfile.css";
import {
  ageRangeData,
  bodyTypeData,
  departmentData,
  characterData,
  mbtiData,
  drinkData,
  smokeData,
} from "./AttributeData";
import { useRegister } from "../../Api/useRegister";
import Select from "react-select";
import ModalComponent from "../SmallComponent/ModalComponent";

const dataContext2 = React.createContext();

function IdealProfile() {
  // 상태관리 변수
  const [idealAge, setIdealAge] = useState(null);
  const [isIdealAge, setIsIdealAge] = useState(false);

  const [idealHeight, setIdealHeight] = useState("");
  const [idealHeightMsg, setIdealHeightMsg] = useState("");
  const [isIdealHeight, setIsIdealHeight] = useState(false);

  const [idealBodyType, setIdealBodyType] = useState(null);
  const [isIdealBodyType, setIsIdealBodyType] = useState(false);

  const [idealDepartment, setIdealDepartment] = useState(null);
  const [isIdealDepartment, setIsIdealDepartment] = useState(false);

  const [idealCharacter1, setIdealCharacter1] = useState(null);
  const [isIdealCharacter1, setIsIdealCharacter1] = useState(false);

  const [idealCharacter2, setIdealCharacter2] = useState(null);
  const [isIdealCharacter2, setIsIdealCharacter2] = useState(false);

  const [idealMBTI, setIdealMBTI] = useState(null);
  const [isIdealMBTI, setIsIdealMBTI] = useState(false);

  const [idealHobby, setIdealHobby] = useState([]);
  const [isIdealHobby, setIsIdealHobby] = useState(false);

  const [idealDrink, setIdealDrink] = useState(null);
  const [isIdealDrink, setIsIdealDrink] = useState(false);

  const [idealsmoke, setIdealSmoke] = useState(null);
  const [isIdealsmoke, setIsIdealSmoke] = useState(false);

  // 입력 함수
  const onAgeHandler = (e) => {
    const nowAge = e.value;
    setIdealAge(nowAge);
    setIsIdealAge(true);
    localStorage.setItem("idealAge", nowAge);
  };

  const onHeightHandler = (e) => {
    const nowIdealHeight = e.currentTarget.value;
    setIdealHeight(nowIdealHeight);

    if (100 <= nowIdealHeight && nowIdealHeight <= 250) {
      setIdealHeightMsg("올바른 형식입니다.");
      setIsIdealHeight(true);
      localStorage.setItem("idealHeight", nowIdealHeight);
    } else {
      setIdealHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIsIdealHeight(false);
      localStorage.setItem("idealHeight", "");
    }
  };

  const onBodyTypeHandler = (e) => {
    const nowBodyType = e.value;
    setIdealBodyType(nowBodyType);
    setIsIdealBodyType(true);
    localStorage.setItem("idealBodyType", nowBodyType);
  };

  const onDepartmentHandler = (e) => {
    const nowDepartment = e.value;
    setIdealDepartment(nowDepartment);
    setIsIdealDepartment(true);
    localStorage.setItem("idealDepartment", nowDepartment);
  };

  const onCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setIdealCharacter1(nowCharacter);
    setIsIdealCharacter1(true);
    localStorage.setItem("idealCharacter1", nowCharacter);
  };

  const onCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setIdealCharacter2(nowCharacter);
    setIsIdealCharacter2(true);
    localStorage.setItem("idealCharacter2", nowCharacter);
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setIdealMBTI(nowMBTI);
    setIsIdealMBTI(true);
    localStorage.setItem("idealMBTI", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.value;
    setIdealDrink(nowDrink);
    setIsIdealDrink(true);
    localStorage.setItem("idealDrink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setIdealSmoke(nowSmoke);
    setIsIdealSmoke(true);
    localStorage.setItem("idealSmoke", nowSmoke);
  };

  // 유효성
  const [pageValid, setPageValid] = useState(false);

  useEffect(() => {
    setPageValid(
      isIdealAge &&
        isIdealHeight &&
        isIdealBodyType &&
        isIdealDepartment &&
        isIdealCharacter1 &&
        isIdealCharacter2 &&
        isIdealMBTI &&
        isIdealHobby &&
        isIdealDrink &&
        isIdealsmoke
    );
  }, [
    isIdealAge,
    isIdealHeight,
    isIdealBodyType,
    isIdealDepartment,
    isIdealCharacter1,
    isIdealCharacter2,
    isIdealMBTI,
    isIdealHobby,
    isIdealDrink,
    isIdealsmoke,
  ]);

  const errorCatchHobbyData = (dataName, num) => {
    try {
      const hobbyData = JSON.parse(localStorage.getItem(`${dataName}`));
      let hobby = "";

      if (num === 0) hobby = hobbyData[0];
      if (num === 1) hobby = hobbyData[1];

      return hobby;
    } catch (error) {
      // 예외 발생 시 처리할 코드 작성
      console.error(
        "An error occurred while retrieving detail hobby data:",
        error
      );
      return error;
    }
  };

  const errorCatchPriority = (dataName, num) => {
    try {
      const priorityData = JSON.parse(localStorage.getItem(`${dataName}`));
      let prioirty = "";

      if (num === 0) prioirty = priorityData[0];
      if (num === 1) prioirty = priorityData[1];
      if (num === 2) prioirty = priorityData[2];

      return prioirty;
    } catch (error) {
      // 예외 발생 시 처리할 코드 작성
      console.error("An error occurred while retrieving priority data:", error);
      return error;
    }
  };

  // 서버에 넘어가는 유저 데이터
  const userData = {
    user: {
      userId: localStorage.getItem("id"),
      password: localStorage.getItem("pw"),
      confirmPassword: localStorage.getItem("confirmPW"),
      name: localStorage.getItem("name"),
      gender: localStorage.getItem("gender"),
      age: localStorage.getItem("age"),
      email: localStorage.getItem("email"),
      studentId: localStorage.getItem("studentID"),
      externalId: localStorage.getItem("kakaoID"),
      detailProfile: {
        height: localStorage.getItem("height"),
        bodyType: localStorage.getItem("bodyType"),
        address: localStorage.getItem("address"),
        department: localStorage.getItem("department"),
        character1: localStorage.getItem("character1"),
        character2: localStorage.getItem("character2"),
        Hobby1: errorCatchHobbyData("detailHobbyData", 0),
        Hobby2: errorCatchHobbyData("detailHobbyData", 1),
        drink: localStorage.getItem("drink"),
        smoke: localStorage.getItem("smoke"),
        firstPriority: errorCatchPriority("priority", 0),
        secondPriority: errorCatchPriority("priority", 1),
        thirdPriority: errorCatchPriority("priority", 2),
      },
      idealTypeProfile: {
        idealAge: localStorage.getItem("idealAge"),
        idealHeight: localStorage.getItem("idealHeight"),
        idealBodyType: localStorage.getItem("idealBodyType"),
        idealDepartment: localStorage.getItem("idealDepartment"),
        idealCharacter1: localStorage.getItem("idealCharacter1"),
        idealCharacter2: localStorage.getItem("idealCharacter2"),
        idealMbti: localStorage.getItem("MBTI"),
        idealHobby1: errorCatchHobbyData("idealHobbyData", 0),
        idealHobby2: errorCatchHobbyData("idealHobbyData", 1),
        idealDrink: localStorage.getItem("idealDrink"),
        idealSmoke: localStorage.getItem("idealSmoke"),
      },
    },
  };

  const { mutate } = useRegister();

  // 제출시 서버에 보내지는 api 호출
  // mutateAsync는 오류를 수동으로 잡아야돼서
  // 웬만하면 mutate를 사용하는 것이 맞다

  const RegisterForm = (e) => {
    e.preventDefault();
    mutate(userData);
    // 여기도 일단 경로 "/"로 바꾸면 됨, 지금은 테스트 중
    //window.location.href = "/idealprofile";
  };

  // react-hook-form 알아보고 적용하기
  return (
    <div className="IdealProfilePage" id="IdealProfile">
      <form onSubmit={RegisterForm}>
        <div className="IdealProfileForm">
          <div className="IdealProfileInputs">
            <div className="title">이상형 프로필 작성</div>
            <Select
              className="age"
              placeholder="나이"
              options={ageRangeData}
              isSearchable={false}
              isClearable={true}
              onChange={onAgeHandler}
            />

            <input
              className="height"
              placeholder="키 ex) 165"
              value={idealHeight}
              type="text"
              onChange={onHeightHandler}
            ></input>
            {idealHeight.length > 0 && (
              <div className={`message ${isIdealHeight ? "success" : "error"}`}>
                {idealHeightMsg}
              </div>
            )}

            <Select
              className="bodyType"
              placeholder="체형"
              options={bodyTypeData}
              isSearchable={false}
              isClearable={true}
              onChange={onBodyTypeHandler}
            />
            <Select
              className="department"
              placeholder="대학"
              options={departmentData}
              isSearchable={false}
              onChange={onDepartmentHandler}
            />
            <Select
              className="character1"
              placeholder="성격1"
              options={characterData}
              isSearchable={false}
              onChange={onCharacterHandler1}
            />
            <Select
              className="character2"
              placeholder="성격2"
              options={characterData}
              isSearchable={false}
              onChange={onCharacterHandler2}
            />
            <Select
              className="mbti"
              placeholder="mbti"
              options={mbtiData}
              noOptionsMessage={() => {
                return "없는데용:)";
              }}
              onChange={onMBTIHandler}
            />

            <dataContext2.Provider value={{ isIdealHobby, setIsIdealHobby }}>
              <ModalComponent
                mainContent="idealHobby"
                contentName="취미"
                header="취미"
                hobbyName="idealHobby"
              />
            </dataContext2.Provider>

            <Select
              className="drink"
              placeholder="음주"
              options={drinkData}
              isSearchable={false}
              onChange={onDrinkHandler}
            />
            <Select
              className="smoke"
              placeholder="흡연"
              options={smokeData}
              isSearchable={false}
              onChange={onSmokeHandler}
            />

            <button
              className="btn-hover pink nextButton submitButton"
              type="submit"
              disabled={!(pageValid && isIdealHobby)}
            >
              제출
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { IdealProfile as default, dataContext2 };
