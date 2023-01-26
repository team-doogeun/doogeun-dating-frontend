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
    <div className="SignUpPage">
      <div className="main">
        {
          {
            MP: <MyProfile />,
            DP: <DetailProfile />,
            IP: <IdealTypeProfile />,
          }[pageNow]
        }
        <div className="pageButton">
          <div className="prevButton">
            <button
              className="footerButton"
              onClick={() => {
                // dp click -> mp
                if (document.getElementById('DetailProfile')) setPageNow('MP');
                // ip click -> dp
                if (document.getElementById('IdealTypeProfile')) setPageNow('DP');
              }}
            >
              이전
            </button>
          </div>
          <div className="nextButton">
            <button
              className="footerButton"
              onClick={() => {
                // mp click -> dp
                if (document.getElementById('MyProfile')) setPageNow('DP');
                // dp click -> ip
                if (document.getElementById('DetailProfile')) setPageNow('IP');
              }}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
