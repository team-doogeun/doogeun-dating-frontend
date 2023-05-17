import React from "react";
import MyPageSidemenuContanier from "../MyPageSidemenu/MyPageSidemenuContainer";
import styled from "styled-components";
import { getCookieValue } from "../../../Api/loginApi";
import profileImage from "../../../../Img/BasicProfilePhoto.png";

const UserSettingView = ({ navigate }) => {
  const userName = getCookieValue("name");
  const userId = getCookieValue("userId");

  return (
    <UserSettingLayout>
      <UserSettingContainer>
        <MyPageSidemenuContanier currentMenu="UserSetting" />
        <UserSettingWrapper>
          <UserinfoTitle>기본 정보</UserinfoTitle>
          <UserinfoBox>
            <UserinfoWrapper>
              <ProfilePhoto src={profileImage} />
              <Userinfo>
                <UserNicknameWrapper>
                  <UserNickname>{userName}님</UserNickname>
                  <UserinfoEditBtn>수정</UserinfoEditBtn>
                </UserNicknameWrapper>
                <UserEmailTitle>아이디</UserEmailTitle>
                <UserEmail>{userId}</UserEmail>
              </Userinfo>
            </UserinfoWrapper>
          </UserinfoBox>
          <UserPassword>비밀번호</UserPassword>
          <UserPasswordBox>
            <UserPasswordEditBtn>비밀번호 변경</UserPasswordEditBtn>
          </UserPasswordBox>
        </UserSettingWrapper>
      </UserSettingContainer>
    </UserSettingLayout>
  );
};

export default UserSettingView;

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
  font-family: "Noto Sans KR";
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
  height: 180px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const UserinfoWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding-top: 36px;
  padding-left: 36px;
  padding-bottom: 36px;
`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 50px;
`;

const Userinfo = styled.div`
  position: relative;
  width: 500px;
  height: 120px;
  display: flex;
  flex-direction: column;
`;

const UserNicknameWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  margin-bottom: 18px;
`;

const UserNickname = styled.div`
  position: relative;
  width: fit-content;
  height: 30px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #5c5c5c;
  margin-right: 20px;
`;

const UserinfoEditBtn = styled.button`
  position: relative;
  width: 70px;
  height: 30px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  background: #ff2559;
  border-radius: 4px;
  border: #ff2559;
  cursor: pointer;
`;
const UserEmailTitle = styled.div`
  position: relative;

  width: 45px;
  height: 20px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #5c5c5c;
`;

const UserEmail = styled.div`
  position: relative;
  width: fit-content;
  height: 23px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: #ff2559;
`;

const UserPassword = styled.div`
  position: relative;
  width: 100px;
  height: 35px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #000000;
  margin-top: 46px;
`;

const UserPasswordBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 760px;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const UserPasswordEditBtn = styled.button`
  position: relative;
  width: 110px;
  height: 35px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  background: #ff2559;
  border-radius: 4px;
  border: #2e55e7;
  margin-left: 40px;
  margin-right: 40px;

  cursor: pointer;
`;
