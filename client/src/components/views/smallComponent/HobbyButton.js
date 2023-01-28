import React, { useState } from 'react';
import './HobbyButton.css';
import { hobbyData } from '../SignUpPage/AttributeData';
import ModalComponent from '../SignInPage/SignInModal';
import { ContentModalComponent } from '../NavBar/NavBar';

function HobbyButton() {
  const data = [...hobbyData];

  const [btnActive, setBtnActive] = useState('');

  const toggleActive = (e) => {
    setBtnActive(e.target.value);
  };

  return (
    <div className="hobbyDataForm">
      {data.map((item, idx) => {
        return (
          <span className="buttonContainer">
            <button value={idx} className={'btn' + (`${idx}` === btnActive ? 'clicked' : '')} onClick={toggleActive}>
              {item.value}
            </button>
          </span>
        );
      })}
    </div>
  );
}

export default HobbyButton;
