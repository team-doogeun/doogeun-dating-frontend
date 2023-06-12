import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MypageSidemenuContainer from "../../MyPageSidemenu/MyPageSidemenuContainer";
import { getJWTCookie } from "../../../../Api/loginApi";
import Modal from "../../../../Modal/LoginModal";
import RoomDataContainer from "../../../MeetingPage/MeetingRoomData/RoomDataContainer";

const UserBlindDateMeetingView = () => {
  const [resUserData, setResUserData] = useState([]);
  const [componentToRender, setComponentToRender] = useState(null);
  const [blindDateORMeet, setBlindDateORMeet] = useState(null);

  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

  const location = useLocation();

  // 내가 호감 보낸 사람
  const getBlindDateToLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/toLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  // 내게 호감 보낸 사람
  const getBlindDatefromLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/fromLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  // 최종매치 유저
  const getBlindDateMatches = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/finalMatches`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingHost = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/my-rooms`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingRegister = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/entering`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingHostStart = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/achieve`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });

    return response;
  };

  const blindDateCategory = (resUserData, detailCategory) => {
    switch (detailCategory) {
      case "toLike":
        setComponentToRender(<UserToLike toLike={resUserData} />);
        break;
      case "fromLike":
        setComponentToRender(<UserFromLike fromLike={resUserData} />);
        break;
      case "matches":
        setComponentToRender(<UserMatches matches={resUserData} />);
        break;
      case "my-rooms":
        setComponentToRender(<UserHost host={resUserData} />);
        break;
      case "entering":
        setComponentToRender(<UserRegister register={resUserData} />);
        break;
      case "achieve":
        setComponentToRender(<UserHostStart hostStart={resUserData} />);
        break;
      default:
        setComponentToRender(<></>);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUrl = window.location.href;
      const splitUrl = currentUrl.split("/");
      const category = splitUrl[splitUrl.length - 2];
      const detailCategory = splitUrl.pop();

      setBlindDateORMeet(category);

      if (detailCategory === "toLike") {
        const userData = await getBlindDateToLike();
        setResUserData(userData);
      } else if (detailCategory === "fromLike") {
        const userData = await getBlindDatefromLike();
        setResUserData(userData);
      } else if (detailCategory === "Matches") {
        const userData = await getBlindDateMatches();
        setResUserData(userData);
      } else if (detailCategory === "my-rooms") {
        const userData = await getMeetingHost();
        setResUserData(userData);
      } else if (detailCategory === "entering") {
        const userData = await getMeetingRegister();
        setResUserData(userData);
      } else if (detailCategory === "achieve") {
        const userData = await getMeetingHostStart();
        setResUserData(userData);
      }

      blindDateCategory(resUserData, detailCategory);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // 5초에 한 번씩 fetchData 실행

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    };
  }, [location]);

  return (
    <>
      <UserSettingLayout>
        <UserSettingContainer>
          {blindDateORMeet && blindDateORMeet === "blindDate" ? (
            <>
              <MypageSidemenuContainer currentMenu="MyBlindDate" />
              <UserSettingWrapper>
                <UserInfoTitle>내 소개팅</UserInfoTitle>
                <UserInfoBox>{componentToRender}</UserInfoBox>
              </UserSettingWrapper>
            </>
          ) : (
            <>
              <MypageSidemenuContainer currentMenu="MyMeeting" />
              <UserSettingWrapper>
                <UserInfoTitle>내 미팅</UserInfoTitle>
                <UserInfoBox>{componentToRender}</UserInfoBox>
              </UserSettingWrapper>
            </>
          )}
        </UserSettingContainer>
      </UserSettingLayout>
    </>
  );
};

const testData = [
  {
    userId: "tommt",
    age: 23,
    department: "경영대",
  },
  {
    userId: "tommt",
    age: 23,
    department: "경영대",
  },
  {
    userId: "tommt",
    age: 23,
    department: "경영대",
  },
];

const UserToLike = ({ toLike }) => {
  return (
    <>
      <UserCommonHeader>내가 호감표시한 상대</UserCommonHeader>
      <UserDataWrapper>
        {toLike.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoDetailTitle>{`아이디 : ${item.userId}`}</UserInfoDetailTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserFromLike = ({ fromLike }) => {
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

  const buttonLike = async (targetUserId) => {
    await axios
      .post(
        `http://localhost:8080/mypage/blindDate/fromLike/like`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(`${userId} -> ${targetUserId}`);
        return res;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });
  };
  return (
    <>
      <UserCommonHeader>내게 호감표시한 상대</UserCommonHeader>
      <UserDataWrapper>
        {fromLike.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoDetailTitle>{`아이디 : ${item.userId}`}</UserInfoDetailTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
            <ButtonBox>
              <LikeButton onClick={() => buttonLike(item.userId)}>
                두근 보내기
              </LikeButton>
            </ButtonBox>
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserMatches = ({ matches }) => {
  const [modalOpen, setModalOpen] = useState({});
  const [kakaoId, setKakaoId] = useState(["123"]);

  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

  const getKakaoId = async (targetUserId) => {
    await axios
      .get(
        `http://localhost:8080/mypage/blindDate/finalMatches/getExternalId`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const resData = res.data;
        setKakaoId((prevKakaoId) => ({
          ...prevKakaoId,
          [targetUserId]: resData,
        }));
      })
      .catch((err) => {
        console.log("매칭된 유저 찾는데 에러가 생김 : ", err);
      });
  };

  const toggleModal = (targetUserId) => {
    setModalOpen((prevModalOpen) => ({
      ...prevModalOpen,
      [targetUserId]: !prevModalOpen[targetUserId],
    }));
  };

  return (
    <>
      <UserCommonHeader>매칭된 유저</UserCommonHeader>
      <UserDataWrapper>
        {matches.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoDetailTitle>{`아이디 : ${item.userId}`}</UserInfoDetailTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
            <ButtonBox>
              <TargetUserCheckButton
                onClick={() => {
                  getKakaoId(item.userId);
                  toggleModal(item.userId);
                }}
              >
                상대 유저 카톡확인
              </TargetUserCheckButton>
            </ButtonBox>
            {modalOpen[item.userId] && (
              <ButtonBox>
                <KakaoIdBox>{`카카오 아이디 : ${
                  kakaoId[item.userId]
                }`}</KakaoIdBox>
              </ButtonBox>
            )}
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserHost = ({ host }) => {
  // modal open
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomData, setRoomData] = useState({});

  const checkRoomData = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    const response = await axios
      .get(`http://localhost:8080/group/${roomId}/info`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response;
  };

  const setRoomDataModal = async (isOpen, roomId) => {
    if (isOpen) {
      const roomData = await checkRoomData(roomId);
      setModalIsOpen(true);
      setRoomData(roomData);
    } else {
      setModalIsOpen(false);
    }
  };

  return (
    <RoomCardWrapper>
      <UserCommonHeader>내가 만든 미팅방 </UserCommonHeader>
      {host.map((room) => (
        <RoomCard key={room.roomId}>
          <RoomCapacity>{`${room.capacityMale}: ${room.capacityFemale}`}</RoomCapacity>
          <RoomTitle>{room.title}</RoomTitle>
          <CheckAndRegisterBlock>
            <CheckRoomData onClick={() => setRoomDataModal(true, room.roomId)}>
              상세정보 확인
            </CheckRoomData>
            {modalIsOpen && (
              <Modal
                CloseModal={() => {
                  setRoomDataModal(false); // 수정: modalIsOpen 상태를 false로 변경
                }}
              >
                <RoomDataContainer roomData={roomData}></RoomDataContainer>
              </Modal>
            )}
          </CheckAndRegisterBlock>
        </RoomCard>
      ))}
    </RoomCardWrapper>
  );
};

const UserRegister = ({ register }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomData, setRoomData] = useState({});

  const checkRoomData = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    const response = await axios
      .get(`http://localhost:8080/group/${roomId}/info`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response;
  };

  const setRoomDataModal = async (isOpen, roomId) => {
    if (isOpen) {
      const roomData = await checkRoomData(roomId);
      setModalIsOpen(true);
      setRoomData(roomData);
    } else {
      setModalIsOpen(false);
    }
  };
  return (
    <RoomCardWrapper>
      <UserCommonHeader>내가 입장한 미팅방 </UserCommonHeader>
      {register.map((room) => (
        <RoomCard key={room.roomId}>
          <RoomCapacity>{`${room.capacityMale}: ${room.capacityFemale}`}</RoomCapacity>
          <RoomTitle>{room.title}</RoomTitle>
          <CheckAndRegisterBlock>
            <CheckRoomData onClick={() => setRoomDataModal(true, room.roomId)}>
              상세정보 확인
            </CheckRoomData>
            {modalIsOpen && (
              <Modal
                CloseModal={() => {
                  setRoomDataModal(false); // 수정: modalIsOpen 상태를 false로 변경
                }}
              >
                <RoomDataContainer roomData={roomData}></RoomDataContainer>
              </Modal>
            )}
          </CheckAndRegisterBlock>
        </RoomCard>
      ))}
    </RoomCardWrapper>
  );
};

const UserHostStart = ({ hostStart }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomData, setRoomData] = useState({});

  const checkRoomData = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    const response = await axios
      .get(`http://localhost:8080/group/${roomId}/info`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response;
  };

  const setRoomDataModal = async (isOpen, roomId) => {
    if (isOpen) {
      const roomData = await checkRoomData(roomId);
      setModalIsOpen(true);
      setRoomData(roomData);
    } else {
      setModalIsOpen(false);
    }
  };
  return (
    <RoomCardWrapper>
      <UserCommonHeader>성사된 미팅방</UserCommonHeader>
      {hostStart.map((room) => (
        <RoomCard key={room.roomId}>
          <RoomCapacity>{`${room.capacityMale}: ${room.capacityFemale}`}</RoomCapacity>
          <RoomTitle>{room.title}</RoomTitle>
          <CheckAndRegisterBlock>
            <CheckRoomData onClick={() => setRoomDataModal(true, room.roomId)}>
              상세정보 확인
            </CheckRoomData>
            {modalIsOpen && (
              <Modal
                CloseModal={() => {
                  setRoomDataModal(false); // 수정: modalIsOpen 상태를 false로 변경
                }}
              >
                <RoomDataContainer roomData={roomData}></RoomDataContainer>
              </Modal>
            )}
          </CheckAndRegisterBlock>
        </RoomCard>
      ))}
    </RoomCardWrapper>
  );
};

const RoomCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  gap: 30px;
`;

const RoomCard = styled.div`
  width: 550px;
  height: 130px;
  border: 1px solid #d5d5d5;
  border-radius: 15px;
  background-color: #fff;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const RoomCapacity = styled.div`
  color: #ff4572;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: white;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 12px;
  width: 60px;
  text-align: left;
`;

const RoomTitle = styled.h2`
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-left: 20px;
  max-height: 40px;
`;

const CheckAndRegisterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 15px;
  padding-top: 5px;
`;

const CheckRoomData = styled.button`
  font-size: 14px;
  font-weight: 700;
  border: none;
  background-color: white;
  color: gray;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    color: #ff4572;
  }
`;

const RoomRegisterInOut = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 15px;
`;

const commonTextStyle = {
  width: "250px",
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

const Title = `
  position: relative;
  width: 180px;
  height: 35px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  
  line-height: 35px;
  color: #000000;
`;

const UserInfoTitle = styled.div`
  ${Title}
  text-align: center;
  font-size: 24px;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
`;

const UserInfoDetailTitle = styled.div`
  ${Title}
  padding-left: 20px;
  margin-top: 14px;
  font-size: 16px;
`;

const UserInfoBox = styled.div`
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

const UserInfoGrid = styled.div`
  width: 200px;
  min-height: 150px;
  max-height: 350px;
  font-size: 16px;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  padding-left: 20px;
  font-size: 16px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 40px;
  color: #737373;
`;

const UserCommonHeader = styled.div`
  position: relative;
  width: 760px;
  height: 35px;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
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
  min-height: 150px;
  max-height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ButtonBox = styled.div`
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  display: flex;
`;

const CheckButton = `
  height: 40px;
  background-color: #ff4572;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 15px;

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: #565656;
    animation: heartbeat 0.5s infinite;
  }
`;

const LikeButton = styled.button`
  ${CheckButton}
  width: 160px;
`;

const TargetUserCheckButton = styled.button`
  ${CheckButton}
  font-size: 14px;
  width: 160px;
`;

const KakaoIdWrapper = styled.div``;

const KakaoIdBox = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 15px;
  color: #737373;
`;

export default UserBlindDateMeetingView;
