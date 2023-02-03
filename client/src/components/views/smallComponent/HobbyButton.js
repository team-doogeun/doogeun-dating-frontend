import React, { useState } from 'react';
import './HobbyButton.css';
import { hobbyData } from '../SignUpPage/AttributeData';
import ModalComponent from '../SignInPage/SignInModal';
import { ContentModalComponent } from '../NavBar/NavBar';
import styled from 'styled-components';

function HobbyButton() {
  const hobby = [...hobbyData];

  const [checked, setChecked] = useState(false);
  const [btnActive, setBtnActive] = useState([]);

  const [btnCnt, setBtnCnt] = useState(0);

  const onChangeHobby = (checked, item) => {
    if (checked) {
      setBtnActive([...btnActive, item]);
    } else if (!checked) {
      setBtnActive(btnActive.filter((el) => el !== item));
    }
  };

  return hobby.map((item, idx) => {
    return (
      <div className="checkboxContainer">
        <input type="checkbox" id={String(idx)} onChange={(e) => onChangeHobby(e.target.checked, e.target.value)} checked={Boolean(item.checked)}></input>
        <label className="checkbox_text">{item.value}</label>
      </div>
    );
  });
}

export default HobbyButton;
