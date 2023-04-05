import React, { useState } from "react";
import "./HobbyPopupModal.css";
import { hobbyData } from "../../SignUpPage/AttributeData";

// function HobbyPopupModal() {
//   // 왜 갑자기 i.value 값 넣으면 렌더링이 안될까??
//   // -> 모르겠음 -> 뜯어보니 includes 함수가 적용이 안됨
//   // 왜 안됐나면 선언할 때 배열로 선언 안해서 그럼
//   // 지금 버튼 클릭 갯수 구현해야됨
//   return (
//     <div className="hobbyContainer">
//       {hobbyData.map((i) => (
//         <div>
//           <HobbyButton key={i.value} value={i.value} label={i.label} />
//         </div>
//       ))}
//     </div>
//   );
// }

// 전체 버튼이 하나의 selected 에 저장되는게 아니라
// 버튼 각각의 selected 값이 존재
// 왜냐하면 HobbyButton 컴포넌트를 selected와 분리하지 안고 여러개를 만들었기 때문..
function HobbyPopupModal() {
  const [selected, setSelected] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  // 버튼을 최대 3개까지만 누를 수 있게 해야한다
  // 3보다 작다면 함수가 작동 되도록
  // 3이면 함수가 작동 안되도록
  const handleClick = (value) => {
    if (selectedCount < 3) {
      if (selected.includes(value)) {
        // 이미 버튼이 눌러져있을 때 누르는 경우
        // filter : 조건을 통과하는 애만 모은다
        let newArr = [...selected];
        setSelected(newArr.filter((item) => item !== value));
        setSelectedCount(selectedCount - 1);
        localStorage.setItem("hobbyData", ...newArr);
      } else {
        let newArr = [...selected];
        setSelected([...newArr, value]);
        setSelectedCount(selectedCount + 1);
        localStorage.setItem("hobbyData", ...newArr);
      }
    }

    // 3일 경우 어떻게 제어할것인가
    // 값이 3인경우 무조건 3개를 선택했을 것이니
    // 값을 줄여주는 코드만 작성
    // if (selectedCount === 3) {
    //   let newArr = [...selected];
    //   setSelected(newArr.filter((item) => item !== value));
    //   setSelectedCount(selectedCount - 1);
    // }
  };

  // 버튼 최대 3개까지 컨트롤
  const handleButtonClick = () => {
    if (selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
    }

    if (selectedCount >= 3) {
      setSelectedCount(selectedCount - 1);
    }
  };

  // currying 함수
  // 함수 2개를 묶는 함수
  const combineFunc = (funcA, funcB) => {
    return function (value) {
      funcA(value);
      funcB();
    };
  };

  console.log(selected);
  console.log(selectedCount);

  return (
    <div className="hobbyContainer">
      {hobbyData.map((i) => (
        <div>
          <button
            key={i.value}
            value={i.value}
            label={i.label}
            onClick={combineFunc(() => handleClick(i.value), handleButtonClick)}
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
