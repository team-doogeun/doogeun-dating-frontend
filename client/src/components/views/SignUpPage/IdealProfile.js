import React, { useState } from "react";
import "./IdealProfile.css";
import {
  ageRangeData,
  bodyTypeData,
  departmentData,
  addressData,
  characterData,
  mbtiData,
  hobbyData,
  drinkData,
  smokeData,
} from "./AttributeData";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Api/useRegister";
import Select from "react-select";
import ModalComponent from "../SmallComponent/ModalComponent";

function IdealProfile() {
  // 상태관리 변수
  const [idealAge, setIdealAge] = useState(null);
  const [idealHeight, setIdealHeight] = useState("");
  const [idealHeightMsg, setIdealHeightMsg] = useState("");
  const [idealIsHeight, setIdealIsHeight] = useState(false);
  const [idealBodyType, setIdealBodyType] = useState(null);
  const [idealDepartment, setIdealDepartment] = useState(null);
  const [idealCharacter, setIdealCharacter] = useState(null);
  const [idealmbti, setIdealMBTI] = useState(null);
  const [idealHobby, setIdealHobby] = useState([]);
  const [idealDrink, setIdealDrink] = useState(null);
  const [idealsmoke, setIdealSmoke] = useState(null);

  // 입력 함수
  const onAgeHandler = (e) => {
    const nowAge = e.value;
    setIdealAge(nowAge);
    localStorage.setItem("idealAge", nowAge);
  };

  const onHeightHandler = (e) => {
    const nowIdealHeight = e.currentTarget.value;
    setIdealHeight(nowIdealHeight);

    if (100 <= nowIdealHeight && nowIdealHeight <= 250) {
      setIdealHeightMsg("올바른 형식입니다.");
      setIdealIsHeight(true);
      localStorage.setItem("idealHeight", nowIdealHeight);
    } else {
      setIdealHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIdealIsHeight(false);
      localStorage.setItem("idealHeight", "");
    }
  };

  const onBodyTypeHandler = (e) => {
    const nowBodyType = e.value;
    setIdealBodyType(nowBodyType);
    localStorage.setItem("idealHeight", nowBodyType);
  };

  const onDepartmentHandler = (e) => {
    const nowDepartment = e.value;
    setIdealDepartment(nowDepartment);
    localStorage.setItem("idealDepartment", nowDepartment);
  };

  const onCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setIdealDepartment(nowCharacter);
    localStorage.setItem("idealCharacter1", nowCharacter);
  };

  const onCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setIdealDepartment(nowCharacter);
    localStorage.setItem("idealCharacter2", nowCharacter);
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setIdealMBTI(nowMBTI);
    localStorage.setItem("idealMBTI", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.value;
    setIdealDrink(nowDrink);
    localStorage.setItem("idealDrink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setIdealSmoke(nowSmoke);
    localStorage.setItem("idealSmoke", nowSmoke);
  };

  const selectStyle = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let IdealProfileData = {
      // height: height,
      // bodyType: bodyType,
      // address: address,
      // department: department,
      // character1: character[0],
      // character2: character[1],
      // mbti: mbti,
      // hobby1: hobby[0],
      // hobby2: hobby[1],
      // drink: drink,
      // smoke: smoke,
      // firstPriority: firstPriority,
      // secondPriority: secondPriority,
      // thirdPriority: thirdPriority,
    };
  };

  // 제출시 서버에 보내지는 api 호출
  // mutateAsync는 오류를 수동으로 잡아야돼서
  // 웬만하면 mutate를 사용하는 것이 맞다
  const RegisterForm = async () => {
    const registerMutation = useRegister();
  };

  // react-hook-form 알아보고 적용하기
  return (
    <div className="IdealProfilePage" id="IdealProfile">
      <div className="IdealProfileForm" onSubmit={RegisterForm}>
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
            <div className={`message ${idealIsHeight ? "success" : "error"}`}>
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
            onChange={onCharacterHandler2}
          />
          <ModalComponent
            mainContent="Hobby"
            contentName="취미"
            header="취미"
          />

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

          <ModalComponent
            mainContent="NextPage"
            contentName="다음"
            header="알림"
            nextPage=""
          />
        </div>
      </div>
    </div>
  );
}

export default IdealProfile;
