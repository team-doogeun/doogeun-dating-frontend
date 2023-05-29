import React, { useState } from "react";
import styled from "styled-components";
import BottomImage from "../../../../Img/Rectangle 2.png";
import Pagination from "../../../Pagination/Pagination";
import axios from "axios";
import { getCookieValue } from "../../../Api/loginApi";
import Modal from "../../../Modal/LoginModal";
import RoomDataContainer from "../MeetingRoomData/RoomDataContainer";

const MeetingPageSelectView = ({ meetings, registerIn, registerOut }) => {
  // meetingRoom Control
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const [roomIntro, setRoomIntro] = useState("");
  const [roomSize, setRoomSize] = useState("2");

  const [roomDataModal, setRoomDataModal] = useState(false);

  // title, intro control
  const [titleMsg, setTitleMsg] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [introMsg, setIntroMsg] = useState("");
  const [isIntro, setIsIntro] = useState(false);

  // 유저가 참여해 있는지 확인
  // 이거 서버에 요청해서 알아야됨...
  const [isUserIn, setIsUserIn] = useState(false);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const meetingsToShow = meetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const returnMeetingRoomsData = (roomId) => {
    for (let i = 0; i < meetingRooms.length; i++) {
      if (meetingRooms[i].id === roomId) {
        return meetingRooms[i];
      }
    }
  };

  const handleCreateRoom = async () => {
    const userId = getCookieValue("userId");

    const newRoom = {
      id: meetingRooms.length + 1,
      title: roomTitle,
      maleNum: roomSize,
      femaleNum: roomSize,
      capacity: roomSize * 2,
      groupBlindCategory: `${roomSize}:${roomSize}`,
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    };

    try {
      const response = await axios.post(`/group/${userId}`, {
        newRoom,
      });
      const newMeetingRoom = response.data;
      setMeetingRooms([...meetingRooms, newMeetingRoom]);
    } catch (error) {
      console.error("Error adding meeting room:", error);
    }

    console.log(meetingRooms);
    setCreateRoom(false);
  };

  const onTitleHandler = (e) => {
    e.preventDefault();
    const nowTitle = e.currentTarget.value;
    setRoomTitle(nowTitle);

    if (nowTitle.length > 20) {
      setTitleMsg("20글자 이내로 입력해주세요.");
      setIsTitle(false);
    } else {
      setTitleMsg("올바른 형식입니다.");
      setIsTitle(true);
    }

    if (nowTitle.length === 0) {
      setTitleMsg("");
      setIsTitle(false);
    }
  };

  const onIntroHandler = (e) => {
    e.preventDefault();
    const nowIntro = e.currentTarget.value;
    setRoomIntro(nowIntro);

    if (nowIntro.length && nowIntro.length > 50) {
      setIntroMsg("50글자 이내로 입력해주세요.");
      setIsIntro(false);
    } else {
      setIntroMsg("올바른 형식입니다.");
      setIsIntro(true);
    }

    if (nowIntro.length === 0) {
      setIntroMsg("");
      setIsIntro(false);
    }
  };

  const checkRoomData = async (roomid) => {
    const userId = getCookieValue("userId");
    const response = await axios
      .get(`group/${roomid}/info`, {
        userId: userId,
        roomId: roomid,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response;
  };

  // 소개글
  return (
    <>
      <Banner>
        <img src={BottomImage} />
      </Banner>
      <MeetingPageSelectWrapper>
        <ContentWrapper>
          <RoomContainer>
            {meetings.map((room) => (
              <RoomCard key={room.id}>
                <RoomCapacity>{`${room.maleNum}: ${room.femaleNum}`}</RoomCapacity>
                <RoomTitle>{room.title}</RoomTitle>
                <CheckRoomData onClick={() => setRoomDataModal(true)}>
                  상세정보 확인
                </CheckRoomData>
                {roomDataModal && (
                  <Modal
                    CloseModal={() => {
                      setRoomDataModal(!roomDataModal);
                    }}
                  >
                    <RoomDataContainer
                      roomData={returnMeetingRoomsData}
                    ></RoomDataContainer>
                  </Modal>
                )}

                <RoomRegisterInOut>
                  {isUserIn ? (
                    <RoomRegisterOutBtn
                      onClick={() => {
                        registerOut();
                      }}
                    >
                      나가기
                    </RoomRegisterOutBtn>
                  ) : (
                    <RoomRegisterInBtn
                      onClick={() => {
                        registerIn();
                      }}
                    >
                      참여
                    </RoomRegisterInBtn>
                  )}
                </RoomRegisterInOut>
              </RoomCard>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </RoomContainer>

          <CreateRoomWrapper>
            <RoomSettingContainer>
              <StyledTitle>방 만들기</StyledTitle>
              <InputWrapper>
                <StyledLabel>방 제목 (20자 내)</StyledLabel>
                <StyledInput
                  type="text"
                  value={roomTitle}
                  onChange={onTitleHandler}
                />
                {roomTitle.length < 20 ? (
                  <OkMsg>{titleMsg}</OkMsg>
                ) : (
                  <NoMsg>{titleMsg}</NoMsg>
                )}
                <StyledLabel>방 소개글 (50자 내)</StyledLabel>
                <StyledInput
                  type="text"
                  value={roomIntro}
                  onChange={onIntroHandler}
                />
                {roomIntro.length < 50 ? (
                  <OkMsg>{introMsg}</OkMsg>
                ) : (
                  <NoMsg>{introMsg}</NoMsg>
                )}
              </InputWrapper>
              <SelectWrapper>
                <StyledLabel>인원 수</StyledLabel>

                <ButtonWrapper>
                  <RoomSizeButton
                    selected={roomSize === "2"}
                    onClick={() => setRoomSize("2")}
                  >
                    2대2
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === "3"}
                    onClick={() => setRoomSize("3")}
                  >
                    3대3
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === "4"}
                    onClick={() => setRoomSize("4")}
                  >
                    4대4
                  </RoomSizeButton>
                </ButtonWrapper>
              </SelectWrapper>
            </RoomSettingContainer>
            <ButtonWrapper>
              <MakeRoomButton onClick={handleCreateRoom}>
                방 만들기
              </MakeRoomButton>
            </ButtonWrapper>
          </CreateRoomWrapper>
        </ContentWrapper>
      </MeetingPageSelectWrapper>
    </>
  );
};

const MeetingPageSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 50px;
  background: #f5f5f5;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1040px;
  text-align: center;
  gap: 30px;
  margin-bottom: 100px;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 50px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 1rem 2rem;
  width: 280px;
  height: 50px;
  font-weight: 700;
  color: white;
  transition: transform 0.3s ease-in-out;
  background-color: #ff2559;
`;

// 참여 / 나가기
const RoomRegisterInOut = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 15px;
`;

const RoomRegisterInBtn = styled.button`
  border: none;
  border-radius: 0.3rem;
  font-weight: 700;
  color: #777777;
  background: transparent;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    color: #ff4572;
  }
`;

const RoomRegisterOutBtn = styled.button`
  border: none;
  border-radius: 0.3rem;
  font-weight: 700;
  color: #777777;
  background: transparent;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    color: #ff4572;
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
  margin-bottom: 8px;
  width: 60px;
  text-align: left;
`;

const MakeRoomButton = styled(StyledButton)``;

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

const RoomCard = styled.div`
  //display: flex;
  //justify-content: center;
  //align-items: flex-start;
  width: 650px;
  height: 130px;
  border: 1px solid #d5d5d5;
  border-radius: 15px;
  background-color: #fff;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const CreateRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 33%;
  min-height: 460px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #d5d5d5;
`;

const RoomSettingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 2px;
`;

const OkMsg = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: green;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const NoMsg = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const RoomSizeButton = styled.button`
  width: 100px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#ff2559" : "white")};
  color: ${(props) => (props.selected ? "#fff" : "#252525")};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
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

const CheckRoomData = styled.button`
  font-size: 15px;
  font-weight: 600;
`;

const Banner = styled.div`
  display: flex;
  height: 300px;
  h1 {
    position: absolute;
  }
  img {
    width: 100%;
  }
`;

export default MeetingPageSelectView;
