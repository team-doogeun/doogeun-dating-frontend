import React, { useState } from 'react';
import './DetailProfile.css';
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
} from './AttributeData';
import Select from 'react-select';

function DetailProfile(MyProfileData, IdealTypeProfileData) {
  // 키
  const [height, setHeight] = useState('');
  const [heightMsg, setHeightMsg] = useState('');
  const [isHeight, setIsHeight] = useState(false);

  // 체형
  const [bodyType, setBodyType] = useState({});

  // 주소
  const [address, setAddress] = useState('');

  // 학과
  const [department, setDepartment] = useState('');

  // 성격
  const [character, setCharacter] = useState([]);

  // mbti
  const [mbti, setMBTI] = useState('');

  // hobby
  const [hobby, setHobby] = useState([]);

  // drink
  const [drink, setDrink] = useState('');

  // smoke
  const [smoke, setSmoke] = useState('');

  // 우선순위
  const [firstPriority, setFirstPriority] = useState('');
  const [secondPriority, setSecondPriority] = useState('');
  const [thirdPriority, setThirdPriority] = useState('');

  // 입력함수
  const onHeightHandler = (e) => {
    setHeight(e.currentTarget.value);

    if (100 < e.currentTarget.value || e.currentTarget.value > 250) {
      setHeightMsg('키는 100cm 이상 250cm 이하로 입력바랍니다.');
      setIsHeight(false);
    } else {
      setHeightMsg('올바른 형식입니다.');
      setIsHeight(true);
    }
  };

  const onBodyTypeHandler = (e) => {
    setBodyType(e.target.value);
    console.log(e.target.value);
  };

  const onAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const onDepartMentHandler = (e) => {
    setDepartment(e.target.value);
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
    setMBTI(e.target.value);
  };

  const onDrinkHandler = (e) => {
    setDrink(e.target.value);
  };

  const onSmokeHandler = (e) => {
    setSmoke(e.target.value);
  };

  // 우선순위가 겹치면!
  // 다음 버튼 눌렀을 때 우선순위가 겹칩니다.
  // 알람 띄우고 페이지 안 넘어가게 하기
  const onFirstPriorityHandler = (e) => {
    setFirstPriority(e.target.value);
  };
  const onSecondPriorityHandler = (e) => {
    setSecondPriority(e.target.value);
  };
  const onThirdPriorityHandler = (e) => {
    setThirdPriority(e.target.value);
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
      <form className="DetailProfileForm" onSubmit={onSubmitHandler}>
        <div className="DetailProfileInputs">
          <input
            onChange={onHeightHandler}
            value={height}
            type="text"
            placeholder="키 ex) 165"
          ></input>
          {height.length > 0 && (
            <div className={`message ${isHeight ? 'success' : 'error'}`}>
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
              return '없는데용:)';
            }}
          />
          {/* hobby1 hobby2 : 디자인 고민 */}

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
        </div>
      </form>
    </div>
  );
}

const DropDownComponent = (props) => {
  <div className={props.classname}></div>;
};

export default DetailProfile;
