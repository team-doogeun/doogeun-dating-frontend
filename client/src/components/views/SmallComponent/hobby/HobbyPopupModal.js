import React, { useState } from 'react';
import './HobbyPopupModal.css';
import { hobbyData } from '../../SignUpPage/AttributeData';

function HobbyPopupModal() {
  let buttonCheckCount = 0;

  const [selected, setSelected] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  // 버튼을 최대 3개까지만 누를 수 있게 해야한다
  // 3보다 작다면 함수가 작동 되도록
  // 3이면 함수가 작동 안되도록
  const handleClick = (button) => {
    if (!selected.includes(button)) selected.push(i.value);

    if (0 <= buttonCheckCount && buttonCheckCount < 3) {
      if (selected.includes(button)) {
        setSelected(selected.fliter((item) => item !== button));
        buttonCheckCount -= 1;
      } else {
        setSelected([...selected, button]);
        buttonCheckCount += 1;
      }
    }
  };

  // 왜 갑자기 i.value 값 넣으면 렌더링이 안될까??
  // -> 모르겠음
  // 지금 버튼 클릭 갯수 구현해야됨
  return (
    <div className="hobbyContainer">
      {hobbyData.map((i) => {
        return (
          <div key={i.value}>
            <button
              key={i.value}
              onClick={handleClick(i.value)}
              className={`buttonItem ${
                selected.includes(i.value) ? 'cliked' : ''
              }`}
            >
              {i.value}
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default HobbyPopupModal;
