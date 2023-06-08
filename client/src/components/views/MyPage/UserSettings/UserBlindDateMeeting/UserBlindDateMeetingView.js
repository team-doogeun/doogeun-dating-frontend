import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MypageSidemenuContainer from "../../MyPageSidemenu/MyPageSidemenuContainer";
import { getJWTCookie } from "../../../../Api/loginApi";

const UserBlindDateMeetingView = () => {
  const userId = getJWTCookie("userId");

  const [toLike, setToLike] = useState({});
  const [fromLike, setFromLike] = useState({});
  const [matches, setMatches] = useState({});

  const [host, setHost] = useState({});
  const [register, setRegister] = useState({});
  const [hostStart, setHostStart] = useState({});

  const [componentToRender, setComponentToRender] = useState(null);

  const getBlindDateToLike = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/toLike`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });
  };

  const getBlindDatefromLike = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/fromLike`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });
  };

  const getBlindDateMatches = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/Matches`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });
  };

  const getMeetingHost = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/x`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });
  };

  const getMeetingRegister = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/y`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });
  };

  const getMeetingHostStart = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/z`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });
  };

  const blindDateCategory = () => {
    const currentUrl = window.location.href;
    const lastWord = currentUrl.split("/").pop();

    switch (lastWord) {
      case "toLike":
        setComponentToRender(<UserToLike />);
        break;
      case "fromLike":
        setComponentToRender(<UserFromLike />);
        break;
      case "matches":
        setComponentToRender(<UserMatches />);
        break;
      case "x":
        setComponentToRender(<UserHost />);
        break;
      case "y":
        setComponentToRender(<UserRegister />);
        break;
      case "z":
        setComponentToRender(<UserHostStart />);
        break;
      default:
        setComponentToRender(<></>);
        break;
    }
  };

  useEffect(() => {
    setToLike(getBlindDateToLike());
    setFromLike(getBlindDatefromLike());
    setMatches(getBlindDateMatches());
    setHost(getMeetingHost());
    setRegister(getMeetingRegister());
    setHostStart(getMeetingHostStart());
  }, []);

  useEffect(() => {
    blindDateCategory();
  }, [window.location.href]);

  return (
    <>
      <UserSettingLayout>
        <UserSettingContainer>
          <MypageSidemenuContainer currentMenu="UserSetting" />
          <UserSettingWrapper>
            <UserinfoTitle>내 소개팅</UserinfoTitle>
            <UserinfoBox>{componentToRender}</UserinfoBox>
          </UserSettingWrapper>
        </UserSettingContainer>
      </UserSettingLayout>
    </>
  );
};

const UserToLike = () => {
  return (
    <>
      <UserCommonHeader>내가 호감표시한 상대</UserCommonHeader>
      <UserDataWrapper>
        <UserInfoGrid>
          <UserInfoTitle>user1</UserInfoTitle>

          <UserInfo>나이 : 23</UserInfo>
          <UserInfo>대학 : 공과대학</UserInfo>
        </UserInfoGrid>
        <UserInfoGrid>user2</UserInfoGrid>
        <UserInfoGrid>user3</UserInfoGrid>
        <UserInfoGrid>user4</UserInfoGrid>
        <UserInfoGrid>user5</UserInfoGrid>
      </UserDataWrapper>
    </>
  );
};

const UserFromLike = () => {
  return <UserCommonHeader>내게 호감표시한 상대</UserCommonHeader>;
};

const UserMatches = () => {
  return <UserCommonHeader>매칭 유저</UserCommonHeader>;
};

const UserHost = () => {
  return <UserCommonHeader>내가 만든 미팅방</UserCommonHeader>;
};

const UserRegister = () => {
  return <UserCommonHeader>내가 입장한 미팅방 </UserCommonHeader>;
};

const UserHostStart = () => {
  return <UserCommonHeader>시작한 미팅방</UserCommonHeader>;
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
  max-height: 700px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const UserCommonHeader = styled.div`
  position: relative;
  width: 760px;
  height: 35px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  margin-top: 15px;
  text-align: center;

  color: #000000;
`;

const UserDataWrapper = styled.div`
  width: 760px;
  min-height: 200px;
  max-height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const UserInfoGrid = styled.div`
  width: 180px;
  min-height: 150px;
  max-height: 150px;
  font-size: 24px;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
`;

const UserInfoTitle = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 16px;
  margin: 8px 0;
`;

const UserInfo = styled.div`
  padding-left: 20px;
  font-size: 16px;
`;

export default UserBlindDateMeetingView;
