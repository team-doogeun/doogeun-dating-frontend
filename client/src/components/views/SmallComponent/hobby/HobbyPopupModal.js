import React, { useState, useEffect } from "react";
import "./HobbyPopupModal.css";
import { hobbyData } from "../../SignUpPage/AttributeData";

// 전체 버튼이 하나의 selected 에 저장되는게 아니라
// 버튼 각각의 selected 값이 존재
// 왜냐하면 HobbyButton 컴포넌트를 selected와 분리하지 않고 여러개를 만들었기 때문..
// 하나의 selected 변수안에 여러가지 버튼이 컨트롤 되도록 해야된다.
function HobbyPopupModal() {
  const [selected, setSelected] = useState([]);

  // 버튼을 최대 2개까지
  // 로컬스토리지에 데이터가 저장되는게 1박자 느리다.
  const handleClick = (e) => {
    const nowValue = e.currentTarget.value;

    if (selected.includes(nowValue)) {
      // 이미 버튼이 눌러져있을 때 누르는 경 : 해제
      // filter : 조건을 통과하는 애만 모은다
      setSelected(selected.filter((item) => item !== nowValue));
    } else if (selected.length < 2) {
      // 안 눌러져있던걸 추가하는 경우
      // 추가할때 값이 늘어나니까 length 제한을 걸어두면 됨
      setSelected([...selected, nowValue]);
    }
  };

  // useState -> 동기화 시키기
  useEffect(() => {
    localStorage.setItem("hobbyData", JSON.stringify(selected));
    // 배열의 길이 = 0, 그럼 삭제
    if (selected.length === 0) localStorage.removeItem("hobbyData");
  }, [selected]);

  console.log(localStorage.getItem("hobbyData"));

  return (
    <div className="hobbyContainer">
      {hobbyData.map((i) => (
        <div>
          <button
            key={i.value}
            value={i.value}
            label={i.label}
            onClick={handleClick}
            className={
              selected.includes(i.value) ? "buttonItem clicked" : "buttonItem"
            }
          >
            {i.label}
          </button>
        </div>
      ))}
    </div>
  );
}
export default HobbyPopupModal;
