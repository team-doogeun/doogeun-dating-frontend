import React, { createContext, useContext, useEffect, useState } from "react";
import "./DetailProfile.css";
import {
  bodyTypeData,
  departmentData,
  addressData,
  characterData,
  mbtiData,
  drinkData,
  smokeData,
  priorityData,
} from "./AttributeData";
import Select from "react-select";
import ModalComponent from "../SmallComponent/ModalComponent";

const dataContext = React.createContext();
const imgContext = React.createContext();

function DetailProfile() {
  // 상태관리 변수
  const [height, setHeight] = useState("");
  const [isHeight, setIsHeight] = useState(false);
  const [heightMsg, setHeightMsg] = useState("");

  const [bodyType, setBodyType] = useState(null);
  const [isBodyType, setIsBodyType] = useState(null);

  const [address, setAddress] = useState(null);
  const [isAddress, setIsAddress] = useState(false);

  const [department, setDepartment] = useState(null);
  const [isDepartment, setIsDepartment] = useState(false);

  const [character, setCharacter] = useState([]);
  const [isCharacter1, setIsCharacter1] = useState(false);
  const [isCharacter2, setIsCharacter2] = useState(false);

  const [mbti, setMBTI] = useState(null);
  const [isMBTI, setIsMBTI] = useState(false);

  // isHobby 어떻게 할까
  const [isDetailHobby, setIsDetailHobby] = useState(false);

  const [drink, setDrink] = useState(null);
  const [isDrink, setIsDrink] = useState(false);

  const [smoke, setSmoke] = useState(null);
  const [isSmoke, setIsSmoke] = useState(false);

  // 우선순위
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSelectedOptions, setIsSelectedOptions] = useState(false);
  const [priority, setPriority] = useState([]);

  // 마지막으로 img
  const [isImg, setIsImg] = useState(false);

  // 유효성
  const [pageValid, setPageValid] = useState(false);

  // 입력값, 선택값 유효성 검사
  useEffect(() => {
    setPageValid(
      isHeight &&
        isBodyType &&
        isAddress &&
        isDepartment &&
        isCharacter1 &&
        isCharacter2 &&
        isMBTI &&
        isDrink &&
        isSmoke &&
        isSelectedOptions &&
        isImg
    );
  }, [
    isHeight,
    isBodyType,
    isAddress,
    isDepartment,
    isCharacter1,
    isCharacter2,
    isMBTI,
    isDrink,
    isSmoke,
    isSelectedOptions,
    isImg,
  ]);

  // 입력함수
  const onHeightHandler = (e) => {
    const nowHeight = e.currentTarget.value;
    setHeight(nowHeight);

    if (100 <= nowHeight && nowHeight <= 250) {
      setHeightMsg("올바른 형식입니다.");
      setIsHeight(true);
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
    setIsBodyType(true);
    localStorage.setItem("bodyType", nowBodyType);
  };

  const onAddressHandler = (e) => {
    const nowAddress = e.value;
    setAddress(nowAddress);
    setIsAddress(true);
    localStorage.setItem("address", nowAddress);
  };

  const onDepartMentHandler = (e) => {
    const nowDepartment = e.value;
    setDepartment(nowDepartment);
    setIsDepartment(true);
    localStorage.setItem("department", nowDepartment);
  };

  const onCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setCharacter(e.value);
    setIsCharacter1(true);
    localStorage.setItem("character1", nowCharacter);
  };

  const onCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setCharacter(e.value);
    setIsCharacter2(true);
    localStorage.setItem("character2", nowCharacter);
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setMBTI(nowMBTI);
    setIsMBTI(true);
    localStorage.setItem("mbti", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.value;
    setDrink(nowDrink);
    setIsDrink(true);
    localStorage.setItem("drink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setSmoke(nowSmoke);
    setIsSmoke(true);
    localStorage.setItem("smoke", nowSmoke);
  };

  // 우선순위 결정
  const handleChange = (selected) => {
    if (selected.length <= 3) {
      setSelectedOptions(selected);
      setPriority(selected.map((option) => option.value));
      if (selected.length === 3) setIsSelectedOptions(true);
      else setIsSelectedOptions(false);
    }
  };

  // 우선순위 로컬스토리지 저장 : state 상태 동기화
  // value값만 문자열로 저장시켜주기
  useEffect(() => {
    const priorityValues = selectedOptions.map((option) => option.value);
    localStorage.setItem("priority", JSON.stringify(priorityValues));
  }, [selectedOptions]);

  const selectStyle = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
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
            autoComplete="off"
          ></input>
          {height.length > 0 && (
            <div className={`message ${isHeight ? "success" : "error"}`}>
              {heightMsg}
            </div>
          )}

          <Select
            className="bodyType"
            placeholder="체형"
            options={bodyTypeData}
            isSearchable={false}
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

          {/* Context API 사용해서 자식 컴포넌트에서 부모컴포넌트의 데이터를 관리하는 것이 가능 */}
          <dataContext.Provider value={{ isDetailHobby, setIsDetailHobby }}>
            <ModalComponent
              mainContent="detailHobby"
              contentName="취미"
              header="취미"
              hobbyName="detailHobby"
            />
          </dataContext.Provider>

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
            placeholder="우선순위"
            options={priorityData}
            styles={selectStyle}
            maxMenuHeight={250}
            isMulti={true}
            closeMenuOnSelect={false}
            onChange={handleChange}
          />
          {priority.length > 0 && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "16px",
                fontFamily: "priority",
              }}
            >
              <div>
                우선순위는 최대 <span style={{ color: "red" }}>3개</span>
                까지만 반영이 됩니다.{" "}
              </div>
              <div style={{ marginTop: "5px" }}>
                {priority.map((option, index) => (
                  <div>{`${index + 1}. ${option}`}</div>
                ))}
              </div>
            </div>
          )}

          <div className="imgAlign">
            <imgContext.Provider value={{ isImg, setIsImg }}>
              <UploadImage imgName="basic" />
              <UploadImage imgName="second" />
              <UploadImage imgName="third" />
            </imgContext.Provider>
          </div>

          <ModalComponent
            mainContent="nextPage"
            contentName="다음"
            header="알림"
            nextPage="users/signup"
            disabled={!(pageValid && isDetailHobby)}
          />
        </div>
      </div>
    </div>
  );
}

const UploadImage = (props) => {
  const [file, setFile] = useState(null);
  const { isImg, setIsImg } = useContext(imgContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;

      if (props.imgName === "basic") {
        localStorage.setItem("basicFilePath", imageUrl);
        setIsImg(true);
        console.log(isImg);
      } else if (props.imgName === "second")
        localStorage.setItem("secondFilePath", imageUrl);
      else if (props.imgName === "third")
        localStorage.setItem("thirdFilePath", imageUrl);
    };

    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
  };

  return (
    <div>
      <label htmlFor={`uploadImage-${props.imgName}`} className="uploadImage">
        <input
          id={`uploadImage-${props.imgName}`}
          type="file"
          onChange={handleFileChange}
          name={`${props.imgName}FilePath`}
        />
        {file && (
          <img
            className="uploadedFile"
            src={URL.createObjectURL(file)}
            alt="uploaded file"
          />
        )}
      </label>
    </div>
  );
};

export { DetailProfile as default, dataContext };
