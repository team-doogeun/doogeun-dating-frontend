import React from 'react';
import './HobbyButton.css';
import { hobbyData } from '../../SignUpPage/AttributeData';

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
