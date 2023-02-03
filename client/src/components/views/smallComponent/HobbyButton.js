import React, { useState } from 'react';
import './HobbyButton.css';
import { hobbyData } from '../SignUpPage/AttributeData';
import ModalComponent from '../SignInPage/SignInModal';
import { ContentModalComponent } from '../NavBar/NavBar';

function HobbyButton() {
  const data = [...hobbyData];

  const [btnActive, setBtnActive] = useState('');

  const [btnCnt, setBtnCnt] = useState(0);

  const toggleActive = (e) => {
    setBtnActive(e.target.value);
  };

  // 기능
  // 1. 버튼 2개까지 누적으로 누르거나 취소가능
  // 2. 무조건 2개는 누르게 해야됨
  // 3. 눌르고 나서 value 값 저장해야됨
  const btnCount = (e) => {
    const cnt = btnCnt;
    if (cnt <= 1) {
      cnt += 1;
      setBtnCnt(cnt);
      // 클로즈 버튼 비활성화
    }

    if (cnt === 2) {
      // 클로즈 버튼 활성화
    }
  };

  return data.map((item, idx) => {
    return (
      <div className="buttonContainer">
        {/* classname을 수정해줘야함 */}
        <button chec value={idx} key={idx} className={'btn' + (`${idx}` === btnActive ? 'clicked' : '')} onClick={toggleActive}>
          {item.value}
        </button>
      </div>
    );
  });
}

export default HobbyButton;
