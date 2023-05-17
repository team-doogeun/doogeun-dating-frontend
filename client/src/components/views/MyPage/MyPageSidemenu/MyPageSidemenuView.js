import React, { useState } from "react";
import styled from "styled-components";

const MypageSidemenuView = ({
  currentMenu,
  onUserSettingClick,
  onMyPostsClick,
  onScrapClick,
}) => {
  const [isUserSettingHovered, setIsUserSettingHovered] = useState(false);
  const [isMyPostsHovered, setIsMyPostsHovered] = useState(false);
  const [isMyScrapHovered, setIsMyScrapHovered] = useState(false);
  return (
    <SidemenuContainer>
      <SidemenuTitle>내 정보 관리</SidemenuTitle>
      <SidemenuContensContainer>
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "UserSetting"
              ? "rgba(255, 37, 89, 0.1)"
              : "transparent"
          }
          onClick={onUserSettingClick}
          onMouseEnter={() => setIsUserSettingHovered(true)}
          onMouseLeave={() => setIsUserSettingHovered(false)}
        >
          <Sidemenu
            fontColor={currentMenu === "UserSetting" ? "#ff2559" : "#737373"}
          >
            내 정보
          </Sidemenu>
        </SidemenuContentWrapper>
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "MyPost" ? "rgba(255, 37, 89, 0.1)" : "transparent"
          }
          onClick={onMyPostsClick}
          onMouseEnter={() => setIsMyPostsHovered(true)}
          onMouseLeave={() => setIsMyPostsHovered(false)}
        >
          <Sidemenu
            fontColor={currentMenu === "MyPost" ? "#ff2559" : "#737373"}
          >
            소개팅
          </Sidemenu>
        </SidemenuContentWrapper>
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "MyScrap" ? "rgba(255, 37, 89, 0.1)" : "transparent"
          }
          onClick={onScrapClick}
          onMouseEnter={() => setIsMyScrapHovered(true)}
          onMouseLeave={() => setIsMyScrapHovered(false)}
        >
          <Sidemenu
            fontColor={currentMenu === "MyScrap" ? "#ff2559" : "#737373"}
          >
            미팅
          </Sidemenu>
        </SidemenuContentWrapper>
      </SidemenuContensContainer>
    </SidemenuContainer>
  );
};
const SidemenuContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 80px;
`;

const SidemenuTitle = styled.div`
  position: relative;
  width: 180px;
  height: 46px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 46px;
  color: #252525;
`;

const SidemenuContensContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  & > div:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const SidemenuContentWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background: ${(props) => props.backgroundColor};
  border-radius: 8px;
  padding-left: 12px;

  :hover {
    background: ${(props) =>
      props.backgroundColor === "transparent"
        ? "rgba(255, 37, 89, 0.1)"
        : "rgba(255, 37, 89, 0.1)"};
  }
`;
const Sidemenu = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 250px;
  height: 46px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: ${(props) => props.fontColor};
  margin-left: 12px;

  cursor: pointer;
  :hover {
    color: #ff2559;
  }
`;

export default MypageSidemenuView;
