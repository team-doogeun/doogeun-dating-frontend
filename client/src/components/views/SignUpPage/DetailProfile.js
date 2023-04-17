import React, { useState } from "react";
import "./DetailProfile.css";
import {
  bodyTypeData,
  departmentData,
  addressData,
  characterData,
  mbtiData,
  hobbyData,
  drinkData,
  smokeData,
  priorityData,
} from "./AttributeData";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../SmallComponent/ModalComponent";

function DetailProfile() {
  // 상태관리 변수
  const [height, setHeight] = useState("");
  const [heightMsg, setHeightMsg] = useState("");
  const [isHeight, setIsHeight] = useState(false);
  const [bodyType, setBodyType] = useState(null);
  const [address, setAddress] = useState(null);
  const [department, setDepartment] = useState(null);
  const [character, setCharacter] = useState([]);
  const [mbti, setMBTI] = useState(null);
  const [hobby, setHobby] = useState([]);
  const [drink, setDrink] = useState(null);
  const [smoke, setSmoke] = useState(null);
  // 우선순위
  const [firstPriority, setFirstPriority] = useState(null);
  const [secondPriority, setSecondPriority] = useState(null);
  const [thirdPriority, setThirdPriority] = useState(null);

  // 입력함수
  const onHeightHandler = (e) => {
    const nowHeight = e.currentTarget.value;

    if (100 <= nowHeight && nowHeight <= 250) {
      setHeightMsg("올바른 형식입니다.");
      setIsHeight(true);
      setHeight(nowHeight);
      localStorage.setItem("height", nowHeight);
    } else {
      setHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIsHeight(false);
      localStorage.setItem("height", "");
    }
  };

  const onBodyTypeHandler = (e) => {
    const nowBodyType = e.value;
    setBodyType(nowBodyType);
    localStorage.setItem("bodyType", nowBodyType);
  };

  const onAddressHandler = (e) => {
    const nowAddress = e.value;
    setAddress(nowAddress);
    localStorage.setItem("address", nowAddress);
  };

  const onDepartMentHandler = (e) => {
    const nowDepartment = e.value;
    setDepartment(nowDepartment);
    localStorage.setItem("department", nowDepartment);
  };

  const onCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setDepartment(nowCharacter);
    localStorage.setItem("character1", nowCharacter);
  };

  const onCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setDepartment(nowCharacter);
    localStorage.setItem("character2", nowCharacter);
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setMBTI(nowMBTI);
    localStorage.setItem("mbti", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.value;
    setDrink(nowDrink);
    localStorage.setItem("drink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setSmoke(nowSmoke);
    localStorage.setItem("smoke", nowSmoke);
  };

  // 우선순위가 겹치면!
  // 필터링 하는 기능 넣기

  // 원본배열 존재
  // 선택한 우선순위를 제거한 배열을 얕게 복사
  // 선택당한 우선순위는 임시저장

  // 1. 선택된거 제거했다가 2. 다른걸로 바꾸면 3. 다시 나타났다가
  let [optionData1, setOptionData1] = useState([...priorityData]);
  const onFirstPriorityHandler = (e) => {
    const nowFirstPriority = e.value;

    // 필터링 코드인데 적용이 안된다.
    // 따로 test 해봐야됨
    let v1 = JSON.stringify(localStorage.getItem("firstPriority"));
    let v2 = localStorage.getItem("secondPriority");
    let v3 = localStorage.getItem("thirdPriority");
    let c1 = optionData1.filter(
      (x) => x.value !== v1 || x.value !== v2 || x.value !== v3
    );
    setOptionData1(c1);

    setFirstPriority(nowFirstPriority);
    localStorage.setItem("firstPriority", nowFirstPriority);
  };
  const onSecondPriorityHandler = (e) => {
    const nowSecondPriority = e.value;
    setSecondPriority(nowSecondPriority);
    localStorage.setItem("secondPriority", nowSecondPriority);
  };
  const onThirdPriorityHandler = (e) => {
    const nowThirdPriority = e.value;
    setThirdPriority(nowThirdPriority);
    localStorage.setItem("thirdPriority", nowThirdPriority);
  };

  const selectStyle = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let DetailProfileData = {
      height: height,
      bodyType: bodyType,
      address: address,
      department: department,
      character1: character[0],
      character2: character[1],
      mbti: mbti,
      hobby1: hobby[0],
      hobby2: hobby[1],
      drink: drink,
      smoke: smoke,
      firstPriority: firstPriority,
      secondPriority: secondPriority,
      thirdPriority: thirdPriority,
    };
  };

  // react-hook-form 알아보고 적용하기
  return (
    <div className="DetailProfilePage" id="DetailProfile">
      <div className="DetailProfileForm">
        <div className="DetailProfileInputs">
          <div className="title">상세 프로필 작성</div>
          <input
            className="height"
            onChange={onHeightHandler}
            value={height}
            type="text"
            placeholder="키 ex) 165"
          ></input>
          {height.length > 0 && (
            <div className={`message ${isHeight ? "success" : "error"}`}>
              {heightMsg}
            </div>
          )}

          {/* value 값 받아오는거 나중에 구현 */}
          {/* getOptionValue={(e) => {
              setBodyType(e.value);
              console.log(bodyType);
            }} */}
          <Select
            className="bodyType"
            placeholder="체형"
            options={bodyTypeData}
            isSearchable={false}
            isClearable={true}
            onChange={onBodyTypeHandler}
          />
          <Select
            className="address"
            placeholder="주소 : ex) 강남구"
            options={addressData}
            isSearchable={false}
            onChange={onAddressHandler}
          />
          <Select
            className="department"
            placeholder="대학"
            options={departmentData}
            isSearchable={false}
            onChange={onDepartMentHandler}
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
          {/* hobby1 hobby2 : 디자인 고민 */}
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

          {/* 우선순위 */}
          <Select
            className="firstPriority"
            placeholder="우선순위 1"
            options={optionData1}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
            onChange={onFirstPriorityHandler}
          />
          <Select
            className="secondPriority"
            placeholder="우선순위 2"
            options={priorityData}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
            onChange={onSecondPriorityHandler}
          />
          <Select
            className="thirdPriority"
            placeholder="우선순위 3"
            options={priorityData}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
            onChange={onThirdPriorityHandler}
          />

          <ModalComponent
            mainContent="NextPage"
            contentName="다음"
            header="알림"
            nextPage="idealprofile"
          />
        </div>
      </div>
    </div>
  );
}

const DropDownComponent = (props) => {
  <div className={props.classname}></div>;
};

export default DetailProfile;
