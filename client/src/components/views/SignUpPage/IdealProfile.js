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
  const [idealHeight, setIdealHeight] = useState("");
  const [idealHeightMsg, setIdealHeightMsg] = useState("");
  const [idealIsHeight, setIdealIsHeight] = useState(false);
  const [idealBodyType, setIdealBodyType] = useState({});
  const [idealDepartment, setIdealDepartment] = useState("");
  const [idealCharacter, setIdealCharacter] = useState([]);
  const [idealmbti, setIdealMBTI] = useState("");
  const [idealHobby, setIdealHobby] = useState([]);
  const [idealDrink, setIdealDrink] = useState("");
  const [idealsmoke, setIdealSmoke] = useState("");

  // 입력 함수
  const onHeightHandler = (e) => {
    const nowIdealHeight = e.currentTarget.value;
    setIdealHeight(nowIdealHeight);

    if (100 < nowIdealHeight || nowIdealHeight > 250) {
      setIdealHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIdealIsHeight(false);
      localStorage.setItem("idealHeight", "");
    } else {
      setIdealHeightMsg("올바른 형식입니다.");
      setIdealIsHeight(true);
      localStorage.setItem("idealHeight", nowIdealHeight);
    }
  };

  const onBodyTypeHandler = (e) => {
    const nowBodyType = e.target.value;
    setIdealBodyType(nowBodyType);
    localStorage.setItem("idealHeight", JSON.stringify(nowBodyType));
  };

  const onAddressHandler = (e) => {
    const nowAddress = e.currentTarget.value;
    //setAddress(nowAddress);
    localStorage.setItem("idealAddress", nowAddress);
  };

  const onDepartmentHandler = (e) => {
    const nowDepartment = e.currentTarget.value;
    //setDepartment(nowDepartment);
    localStorage.setItem("idealDepartment", nowDepartment);
  };

  const onCharacterHandler = (e) => {
    // for (let i = 0; i < character.length; i++) {
    //   if (character[i].value === e.currentTarget.value) {
    //     character.splice(i, 1);
    //     characterData = [...character];
    //     break;
    //   }
    // }
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.currentTarget.value;
    // setMBTI(nowMBTI);
    localStorage.setItem("idealMBTI", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.currentTarget.value;
    console.log(nowDrink);
    //setDrink(nowDrink);
    localStorage.setItem("idealDrink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.currentTarget.value;
    //setSmoke(nowSmoke);
    localStorage.setItem("idealSmoke", nowSmoke);
  };

  // 우선순위가 겹치면!
  // 다음 버튼 눌렀을 때 우선순위가 겹칩니다.
  // 알람 띄우고 페이지 안 넘어가게 하기
  const onFirstPriorityHandler = (e) => {
    //setFirstPriority(e.target.value);
  };
  const onSecondPriorityHandler = (e) => {
    //setSecondPriority(e.target.value);
  };
  const onThirdPriorityHandler = (e) => {
    //setThirdPriority(e.target.value);
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
          <Select
            className="age"
            placeholder="나이"
            options={ageRangeData}
            isSearchable={false}
            isClearable={true}
          />

          <input
            className="height"
            onChange={onHeightHandler}
            value={idealHeight}
            type="text"
            placeholder="키 ex) 165"
          ></input>
          {idealHeight.length > 0 && (
            <div className={`message ${idealIsHeight ? "success" : "error"}`}>
              {idealHeightMsg}
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
          />
          <Select
            className="department"
            placeholder="대학"
            options={departmentData}
            isSearchable={false}
          />
          <Select
            className="character1"
            placeholder="성격1"
            options={characterData}
            isSearchable={false}
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
          />

          <div className="nextButton">
            <button className="footerButton" onClick={() => {}}>
              제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdealProfile;
