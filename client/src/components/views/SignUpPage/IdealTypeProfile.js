import React from 'react';
import { useState } from 'react';

function IdealTypeProfile(MyProfileData, DetailProfileData) {
  // 나이
  const [idealAge, setIdealAge] = useState('');

  // 키
  const [idealHeight, setIdealHeight] = useState('');

  // 체형
  const [idealBodyType, setIdealBodyType] = useState({});

  // 학과
  const [idealDepartment, setIdealDepartment] = useState('');

  // 성격
  const [idealCharacter, setIdealCharacter] = useState([]);

  // mbti
  const [idealMbti, setIdealMBTI] = useState('');

  // hobby
  const [idealhobby, setIdealHobby] = useState([]);

  // drink
  const [idealDrink, setIdealDrink] = useState('');

  // smoke
  const [idealSmoke, setIdealSmoke] = useState('');

  let IdealProfileData = {
    idealAge: idealAge,
    idealHeight: idealHeight,
    idealBodyType: idealBodyType,
    idealDepartment: idealDepartment,
    idealCharacter1: idealCharacter[0],
    idealCharacter2: idealCharacter[1],
    idealMbti: idealMbti,
    idealhobby1: idealhobby[0],
    idealhobby2: idealhobby[1],
    idealDrink: idealDrink,
    idealSmoke: idealSmoke,
  };

  return <div id="IdealTypeProfile">IdealTypeProfile</div>;
}

export default IdealTypeProfile;
