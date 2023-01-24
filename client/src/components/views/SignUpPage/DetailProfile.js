import React, { useState } from 'react';
import './DetailProfile.css';
import { bodyTypeData, departmentData, addressData, characterData, mbtiData, hobbyData, drinkData, smokeData, priorityData } from './AttributeData';
import Select from 'react-select';

function DetailProfile() {
  // 키
  const [height, setHeight] = useState('');
  const [heightMsg, setHeightMsg] = useState('');
  const [isHeight, setIsHeight] = useState(false);

  // 몸매 : 타입 -> 마름 슬림 탄탄 보통 통통 근육질
  const [bodyType, setBodyType] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  // 학과
  const [department, setDepartment] = useState('');

  // 성격 -> 6가지 중 2가지 입력(선택)받기
  const [character, setCharacter] = useState([]);

  // mbti
  const [mbti, setMbti] = useState('');

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

  return (
    <div className="DetailProfilePage" id="DetailProfile">
      <form className="DetailProfileForm">
        <div className="DetailProfileInputs">
          <input onChange={onHeightHandler} value={height} type="text" placeholder="키 ex) 165"></input>
          {height.length > 0 && <div className={`message ${isHeight ? 'success' : 'error'}`}>{heightMsg}</div>}

          <Select className="bodyType" placeholder="나이" options={bodyTypeData} />
          <Select className="address" placeholder="주소 : 구" options={addressData} />
          <Select className="department" placeholder="대학" options={departmentData} />
          <Select className="character1" placeholder="성격1" options={characterData} />
          <Select className="character2" placeholder="성격2" options={characterData} />
          <Select className="mbti" placeholder="mbti" options={mbtiData} />
          {/* hobby1 hobby2 : 디자인 고민 */}

          <Select className="drink" placeholder="음주" options={drinkData} />
          <Select className="smoke" placeholder="흡연" options={smokeData} />

          {/* 우선순위 */}
          <Select className="firstPriority" placeholder="우선순위 1" options={priorityData} />
          <Select className="secondPriority" placeholder="우선순위 2" options={priorityData} />
          <Select className="thirdPriority" placeholder="우선순위 3" options={priorityData} />
        </div>
      </form>
    </div>
  );
}

const DropDownComponent = (props) => {
  <div className={props.classname}></div>;
};

export default DetailProfile;
