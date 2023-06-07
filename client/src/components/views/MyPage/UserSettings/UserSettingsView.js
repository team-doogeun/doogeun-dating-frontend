import React, { useState } from "react";
import MyPageSidemenuContanier from "../MyPageSidemenu/MyPageSidemenuContainer";
import styled from "styled-components";
import { getJWTCookie } from "../../../Api/loginApi";
import profileImage from "../../../../Img/BasicProfilePhoto.png";

const UserSettingView = ({ getUserInfo, changePassword }) => {
  const userName = getJWTCookie("name");
  const userId = getJWTCookie("userId");
  const [isEditInfo, setIsEditInfo] = useState(true);

  const userEdit = async () => {
    setIsEditInfo(!isEditInfo);
    const userData = await getUserInfo();
    setUserInfo(userData);
  };

  const [userInfo, setUserInfo] = useState({
    user: {
      userId: "kiki123",
      password: "12345",
      confirmPassword: "12345",
      name: "kiki",
      gender: "여",
      age: 23,
      email: "kiki1234@konkuk.ac.kr",
      studentId: "20202224",
      externalId: "kiki123",

      detailProfile: {
        height: 157,
        bodyType: "마름",
        address: "용산구",
        department: "공과대학",
        character1: "시크",
        character2: "이성적",
        hobby1: "여행",
        hobby2: "헬스",
        mbti: "INTJ",
        smoke: "종종",
        drink: "종종",
        hobby1: "복싱",
        hobby2: "축구",
        drink: "종종",
        smoke: "흡연 안 함",
        firstPriority: "취미",
        secondPriority: "체형",
        thirdPriority: "나이",
      },
      idealTypeProfile: {
        idealAge: "20대 중반",
        idealHeight: "175이상 175미만",
        idealBodyType: "슬림",
        idealDepartment: "경영대학",
        idealCharacter1: "다정",
        idealCharacter2: "이성적",
        idealMbti: "ENFP",
        idealHobby1: "등산",
        idealHobby2: "야구",
        idealDrink: "종종",
        idealSmoke: "흡연 안 함",
      },
    },
  });

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
                  <UserinfoEditBtn
                    onClick={() => {
                      userEdit();
                    }}
                  >
                    정보 수정
                  </UserinfoEditBtn>
                </UserNicknameWrapper>
                <UserIdTitle>아이디 : </UserIdTitle>
                <UserId>{userId}</UserId>
                {isEditInfo && userInfo && (
                  <UserOtherInfo>
                    <UserInfoData>{`성별 : ${userInfo.user.gender}`}</UserInfoData>
                    <UserInfoData>{`나이 : ${userInfo.user.age}`}</UserInfoData>
                    <UserInfoData>{`학번 : ${userInfo.user.studentId}`}</UserInfoData>
                    <UserInfoData>{`카카오Id : ${userInfo.user.externalId}`}</UserInfoData>
                    <UserInfoData>{`email : ${userInfo.user.email}`}</UserInfoData>
                  </UserOtherInfo>
                )}
              </Userinfo>
            </UserinfoWrapper>
          </UserinfoBox>
          <UserPassword>비밀번호</UserPassword>
          <UserPasswordBox>
            <PasswordForm>
              <PasswordInput>
                <ChangePasswordBox placeholder="비밀번호"></ChangePasswordBox>
                <ChangePasswordBox placeholder="비밀번호 확인"></ChangePasswordBox>
              </PasswordInput>
              <UserPasswordEditBtn onClick={changePassword}>
                비밀번호 변경
              </UserPasswordEditBtn>
            </PasswordForm>
          </UserPasswordBox>
        </UserSettingWrapper>
      </UserSettingContainer>
    </UserSettingLayout>
  );
};

export default UserSettingView;

const commonTextStyle = {
  width: "200px",
  height: "20px",
  fontFamily: "Noto Sans KR",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#5c5c5c",
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
  min-height: 250px;
  max-height: 380px;
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
  /* height: fit-content; */
  max-height: 700px;
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
  min-height: 120px;
  max-height: 700px;
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

const UserOtherInfo = styled.div`
  width: 500px;
  height: 300px;
`;

const UserInfoData = styled.div`
  ${commonTextStyle}
  margin-top: 8px;
`;

const UserIdTitle = styled.div`
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

const UserId = styled.div`
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
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const PasswordForm = styled.form`
  width: 760px;
  height: 180px;
  display: flex;
  flex-direction: row;
`;

const PasswordInput = styled.div`
  height: 180px;
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const ChangePasswordBox = styled.input`
  width: 338px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  margin-left: 40px;
  padding-left: 15px;
  margin-top: 25px;
  ::placeholder {
    color: #a5a5a5;
  }
`;

const UserPasswordEditBtn = styled.button`
  position: relative;
  width: 130px;
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
  margin-top: 110px;

  cursor: pointer;
`;
