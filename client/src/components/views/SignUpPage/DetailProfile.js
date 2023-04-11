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
  const [bodyType, setBodyType] = useState({});
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [character, setCharacter] = useState([]);
  const [mbti, setMBTI] = useState("");
  const [hobby, setHobby] = useState([]);
  const [drink, setDrink] = useState("");
  const [smoke, setSmoke] = useState("");
  // 우선순위
  const [firstPriority, setFirstPriority] = useState("");
  const [secondPriority, setSecondPriority] = useState("");
  const [thirdPriority, setThirdPriority] = useState("");

  // 입력함수
  const onHeightHandler = (e) => {
    const nowHeight = e.currentTarget.value;
    setHeight(nowHeight);

    if (100 < nowHeight || nowHeight > 250) {
      setHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIsHeight(false);
    } else {
      setHeightMsg("올바른 형식입니다.");
      setIsHeight(true);
      localStorage.setItem("height", nowHeight);
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

  const onCharacterHandler = (e) => {
    for (let i = 0; i < character.length; i++) {
      if (character[i].value === e.currentTarget.value) {
        character.splice(i, 1);
        characterData = [...character];
        break;
      }
    }
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
  const onFirstPriorityHandler = (e) => {
    const nowFirstPriority = e.value;
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
          <input
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
            onChange={onCharacterHandler}
          />
          <Select
            className="character2"
            placeholder="성격2"
            options={characterData}
            isSearchable={false}
          />
          <Select
            className="mbti"
            placeholder="mbti"
            options={mbtiData}
            noOptionsMessage={() => {
              return "없는데용:)";
            }}
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
          />
          <Select
            className="smoke"
            placeholder="흡연"
            options={smokeData}
            isSearchable={false}
          />

          {/* 우선순위 */}
          <Select
            className="firstPriority"
            placeholder="우선순위 1"
            options={priorityData}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
          />
          <Select
            className="secondPriority"
            placeholder="우선순위 2"
            options={priorityData}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
          />
          <Select
            className="thirdPriority"
            placeholder="우선순위 3"
            options={priorityData}
            isSearchable={false}
            styles={selectStyle}
            maxMenuHeight={220}
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
