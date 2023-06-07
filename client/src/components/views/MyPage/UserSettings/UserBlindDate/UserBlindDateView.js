import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import MypageSidemenuContainer from '../../MyPageSidemenu/MyPageSidemenuContainer';
import { getJWTCookie } from '../../../../Api/loginApi';

const UserBlindDateView = () => {
  const userId = getJWTCookie('userId');

  const [toLike, setToLike] = useState('');
  const [fromLike, setFromLike] = useState('');
  const [matches, setMatches] = useState('');

  const getBlindDateToLike = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/toLike`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('내가 호감표시한 유저들 에러 :', err);
      });
  };

  const getBlindDatefromLike = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/fromLike`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('내게 호감표시한 유저들 에러 :', err);
      });
  };

  const getBlindDateMatches = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/Matches`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('매칭 유저들 에러 :', err);
      });
  };

  useEffect(() => {
    setToLike(getBlindDateToLike());
    setFromLike(getBlindDatefromLike());
    setMatches(getBlindDateMatches());
  }, []);

  return (
    <>
      <UserSettingLayout>
        <UserSettingContainer>
          <MypageSidemenuContainer currentMenu="UserSetting" />
          <UserSettingWrapper>
            <UserinfoTitle>내 소개팅</UserinfoTitle>
            <UserinfoBox>
              <UserToLike>내가 호감표시한 상대</UserToLike>
              {/* <div>{toLike}</div> */}
              <UserFromLike>내게 호감표시한 상대</UserFromLike>
              {/* <div>{fromLike}</div> */}
              <UserMatches>매칭 유저</UserMatches>
              {/* <div>{matches}</div> */}
            </UserinfoBox>
          </UserSettingWrapper>
        </UserSettingContainer>
      </UserSettingLayout>
    </>
  );
};

const UserSettingLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  top: 150px;
  margin-top: 100px;
`;

const UserSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserSettingWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 700px;
  width: 800px;
  max-width: 1100px;
  flex-direction: column;
  justify-content: left;
  margin-top: 80px;
`;

const UserinfoTitle = styled.div`
  position: relative;
  width: 110px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
`;

const UserinfoBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 760px;
  min-height: 250px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const UserToLike = styled.div`
  position: relative;
  width: 400px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
`;
const UserFromLike = styled.div`
  position: relative;
  width: 400px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
`;
const UserMatches = styled.div`
  position: relative;
  width: 400px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
`;

export default UserBlindDateView;
