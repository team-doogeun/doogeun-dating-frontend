import React from 'react';
import styled from 'styled-components';
import profileImage from '../../../Img/BasicProfilePhoto.png';

const ProfileView = ({ logoutHandler, userName, navigator }) => {
  return (
    <ProfileContainer>
      <Triangle />
      <ProfileWrapper>
        <UserInfo>
          <ProfilePhotoWrapper>
            <ProfilePhoto
              src={profileImage}
              type="button"
              onClick={() => navigator('/my-page')}
              alt="ProfilePhoto"
              style={{ borderRadius: '4px' }}
            />
          </ProfilePhotoWrapper>
          <UserNicknameWrapper
            type="button"
            onClick={() => navigator('/my-page')}
          >
            {userName}님
          </UserNicknameWrapper>
        </UserInfo>
        <ProfileMenuWrapper>
          <ProfileMenu>내 소개팅</ProfileMenu>
          <ProfileMenu type="button">내 미팅</ProfileMenu>
          <ProfileMenu type="button" onClick={logoutHandler}>
            로그아웃
          </ProfileMenu>
        </ProfileMenuWrapper>
      </ProfileWrapper>
    </ProfileContainer>
  );
};
const ProfileContainer = styled.div`
  top: 40px;
  left: -30px;
  position: absolute;
  width: fit-content;
  height: 320px;
`;
const Triangle = styled.div`
  position: relative;

  width: 13.7px;
  height: 13.7px;

  background: #ffffff;
  transform: rotate(45deg);
  left: 170px;
  top: 7.5px;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  z-index: 1;
`;
const ProfileWrapper = styled.div`
  position: absolute;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  width: 197px;
  height: 299px;
  text-align: center;
  align-items: center;

  border: 1px solid #dddddd;
  border-radius: 5px;

  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0.25);
`;
const UserInfo = styled.div`
  position: relative;
  width: 173px;
  height: 147px;

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  margin-top: 20px;

  border-bottom: 1px solid #dddddd;
`;
const ProfilePhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  height: fit-content;
`;
const ProfilePhoto = styled.img`
  position: relative;
  cursor: pointer;
  width: 69px;
  height: 69px;
`;
const UserNicknameWrapper = styled.div`
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);

  width: 161px;
  height: 26px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;

  color: #2e55e7;
  cursor: pointer;
`;

const ProfileMenuWrapper = styled.div`
  position: relative;
  width: 173px;
  height: 147px;

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  margin-top: 22px;

  border-bottom: 1px solid #dddddd;

  & > div:not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ProfileMenu = styled.div`
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 23px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #5c5c5c;
  :hover {
    color: #2e55e7;
  }
`;

export default ProfileView;
