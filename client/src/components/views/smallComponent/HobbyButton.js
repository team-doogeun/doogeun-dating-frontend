import React, { useState } from 'react';
import './HobbyButton.css';
import { hobbyData } from '../SignUpPage/AttributeData';
import ModalComponent from '../SignInPage/SignInModal';
import { ContentModalComponent } from '../NavBar/NavBar';
import styled from 'styled-components';

function HobbyButton() {
  const hobby = [...hobbyData];

  return (
    <div>
      <label>
        <input type="checkbox" name="color" value="blue" /> Blue
      </label>
      <label>
        <input type="checkbox" name="color" value="red" /> Red
      </label>
    </div>
  );
}

export default HobbyButton;
