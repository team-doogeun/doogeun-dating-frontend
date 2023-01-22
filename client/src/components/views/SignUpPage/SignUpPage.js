import React, { useEffect, useState } from 'react';
import './SignUpPage.css';
import MyProfile from './MyProfile';
import DetailProfile from './DetailProfile';
import IdealTypeProfile from './IdealTypeProfile';

function SignUpPage() {
  // MP(MyProfile), DP(DetailProfile), IP(IdealTypeProfile)
  // 화면이 mp일 경우 : 오른쪽 가는 버튼만 활성화
  // 화면이 ip일 경우 : 왼쪽 가는 버튼만 활성화

  const [pageNow, setPageNow] = useState('MP');

  return (
    <div className="slider">
      <div className="slider__arrow-left">
        <button
          className="arrow"
          onClick={() => {
            // dp click -> mp
            if (document.getElementById('DetailProfile')) setPageNow('MP');
            // ip click -> dp
            if (document.getElementById('IdealTypeProfile')) setPageNow('DP');
          }}
        >
          {'<'}
        </button>
      </div>
      <div className="main">
        {
          {
            MP: <MyProfile />,
            DP: <DetailProfile />,
            IP: <IdealTypeProfile />,
          }[pageNow]
        }
      </div>
      <div className="slider__arrow-right">
        <button
          className="arrow"
          onClick={() => {
            // mp click -> dp
            if (document.getElementById('MyProfile')) setPageNow('DP');

            // dp click -> ip
            if (document.getElementById('DetailProfile')) setPageNow('IP');
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
