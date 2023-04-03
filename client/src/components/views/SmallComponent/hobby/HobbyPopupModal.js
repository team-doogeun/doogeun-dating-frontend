import React, { useState } from "react";
import "./HobbyPopupModal.css";
import { hobbyData } from "../../SignUpPage/AttributeData";

function HobbyPopupModal() {
  const [selectedCount, setSelectedCount] = useState(0);

  // 버튼 최대 3개까지 컨트롤
  const handleButtonClick = () => {
    if (selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
      console.log(selectedCount);
    }
  };

  // 버튼 갯수 리셋
  const handleButtonReset = () => {
    setSelectedCount(0);
  };

  // 왜 갑자기 i.value 값 넣으면 렌더링이 안될까??
  // -> 모르겠음 -> 뜯어보니 includes 함수가 적용이 안됨
  // 왜 안됐나면 선언할 때 배열로 선언 안해서 그럼
  // 지금 버튼 클릭 갯수 구현해야됨
  return (
    <div className="hobbyContainer">
      {hobbyData.map((i) => (
        <div>
          <HobbyButton
            key={i.value}
            value={i.value}
            label={i.label}
            onClick={handleButtonClick}
            buttonCount={selectedCount}
          />
        </div>
      ))}
    </div>
  );
}

function HobbyButton(props) {
  const { value, label, onClick, buttonCount } = props;
  const [selected, setSelected] = useState([]);

  // 버튼을 최대 3개까지만 누를 수 있게 해야한다
  // 3보다 작다면 함수가 작동 되도록
  // 3이면 함수가 작동 안되도록
  const handleClick = () => {
    if (selected.includes(value)) {
      // 이미 버튼이 눌러져있을 때 누르는 경우
      // filter : 조건을 통과하는 애만 모은다
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
      console.log(selected);
    }

    // props로 받음 -> 인자에 있잖아!!
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={selected.includes(value) ? "buttonItem clicked" : "buttonItem"}
    >
      {label}
    </button>
  );
}
export default HobbyPopupModal;
