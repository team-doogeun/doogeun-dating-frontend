import React, { useEffect, useState } from 'react';
import MyProfile from './MyProfile';
import DetailProfile from './DetailProfile';
import IdealTypeProfile from './IdealTypeProfile';
import { set } from 'react-hook-form';

function SignUpPage() {
  // MP(MyProfile), DP, IP
  // 화면이 mp일 경우 : 오른쪽 가는 버튼만 활성화
  // 화면이 ip일 경우 : 왼쪽 가는 버튼만 활성화

  const [pageNum, setPageNum] = useState(1);
  const [MPopen, setMPopen] = useState(true);
  const [DPopen, setDPopen] = useState(false);
  const [IPopen, setIPopen] = useState(false);

  const moveRight = () => {
    pageNum += 1;
    setPageNum(pageNum);
  };

  const moveLeft = () => {
    pageNum -= 1;
    setPageNum(pageNum);
  };

  return (
    <div className="slider">
      <div className="slider__arrow-left">
        <button
          className="arrow"
          onClick={() => {
            if (document.getElementById('DetailProfile')) {
              // dp에서 누르면, mp 켜지게
              setMPopen(true);
              setDPopen(false);
              setIPopen(false);
            }

            if (document.getElementById('IdealTypeProfile')) {
              setMPopen(false);
              setDPopen(true);
              setIPopen(false);
            }
          }}
        >
          {'<'}
        </button>
      </div>
      <div>
        {MPopen === true && <MyProfile />}
        {DPopen === true && <DetailProfile />}
        {IPopen === true && <IdealTypeProfile />}
      </div>
      <div className="slider__arrow-right">
        <button
          className="arrow"
          onClick={() => {
            if (document.getElementById('MyProfile')) {
              // mp에서 누르면, dp 켜지게
              setMPopen(false);
              setDPopen(true);
              setIPopen(false);
            }

            if (document.getElementById('DetailProfile')) {
              // dp에서 누르면, ip 켜지게
              setMPopen(false);
              setDPopen(false);
              setIPopen(true);
            }
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
