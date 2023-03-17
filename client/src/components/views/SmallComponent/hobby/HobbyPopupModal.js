import React from "react";
import "./HobbyPopupModal.css";
import { hobbyData } from "../../SignUpPage/AttributeData";

function HobbyPopupModal() {
  let buttonCheckCount = 0;

  return (
    <div className="hobbyContainer">
      {hobbyData.map((i) => {
        return (
          <div
            onClick={() => {
              if (0 <= buttonCheckCount && buttonCheckCount < 3) {
                if (i.checked === false) {
                  i.checked = true;
                  buttonCheckCount += 1;
                  console.log(i.checked);
                } else {
                  i.checked = false;
                  buttonCheckCount -= 1;
                  console.log(i.checked);
                }
              } else {
              }
            }}
          >
            <button
              key={i.value}
              className={
                i.checked === false ? "buttonItem" : "buttonItem clicked"
              }
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
