import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./meeting.css";
import Modal from "../../Modal/LoginModal";

// 카테고리 : 2대2/ 3대3
// 왼쪽에 설명 + 방 만들기 버튼
// 오른쪽엔 만들어진 방 2줄 그리고 아래엔 페이지 넘버링
// 제목, 방 만든 사람 아이디, 방 만든 날짜
// 남 2 : 여 3 이런식으로 현재인원 표기하기

// 마이페이지
// 인풋으로 모든 정부 수정 가능
// 모달로 정보 수정

// 데이터 유지 1주일(사람마다 1주일 유지 )
// 소개팅, 미팅
// 마이페이지 소개팅은
// 1. 내가 좋아요 보낸 사람 : 아이디 표시
// 2. 내가 좋아요 받은 사람 : 좋아요 누를 수 있는 버튼 추가
// 3. 매칭된 사람

// 해야될게 디자인
// 그리고 인원이 다 차면 호스트가 카톡 아이디를 전부 받아옴
// 시작을 눌러야 시작됨
// 참가할 때 : 카카오 아이디 요청(get)
// 아이디 인증 : sessionId

// 만들기 누르면 makeRoom 사용
const MeetingRoomView = ({ meetings, makeRoom, registerIn, registerOut }) => {
  const [meetingModal, setMeetingModal] = useState(false);

  return (
    <MeetingPage>
      <ScreenUp>
        <MeetingRoomMsg>건전한 미팅!</MeetingRoomMsg>
        <MeetingRoomContainer>
          {meetings.map((meetingData) => (
            <CardTmp
              key={meetingData.id}
              meetings={meetingData}
              registerIn={registerIn}
              registerOut={registerOut}
            ></CardTmp>
          ))}
        </MeetingRoomContainer>
      </ScreenUp>
      <PageNumContainer></PageNumContainer>
    </MeetingPage>
  );
};

const CardTmp = ({ meetings, registerIn, registerOut }) => {
  return (
    <div className="card">
      <div className="card-body">
        <CardBody>
          <MaleFeMale>{`${meetings.maleNum} : ${meetings.femaleNum}`}</MaleFeMale>
          <CardTitle>{`Title : ${meetings.title}`}</CardTitle>
          <CardText>{`Intro : ${meetings.groupBlindIntroduction}`}</CardText>
          <BtnContainer>
            <ParticipateButton
              onClick={() => {
                registerIn(meetings.id, meetings.title);
              }}
            >
              참여
            </ParticipateButton>
            <RunOutButton
              onclick={() => {
                registerOut(meetings.id, meetings.title);
              }}
            >
              나가기
            </RunOutButton>
          </BtnContainer>
        </CardBody>
      </div>
    </div>
  );
};

const MakeMeetingRoom = styled.div``;

const MeetingPage = styled.div`
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ScreenUp = styled.div`
  display: flex;
  flex-direction: row;
`;

const MeetingRoomMsg = styled.div`
  width: 80%;
  color: black;
  font-size: 24px;
  font-weight: 600;
  align-items: center;
  margin: auto 0;
`;

const MeetingRoomContainer = styled.div`
  width: 80%;
  min-height: calc(100vh - 530px);
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 4개의 열을 동일한 너비로 설정 */
  grid-gap: 10px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: #ffffff;
`;

const Card = styled.div`
  width: 220px;
  height: 220px;
  border: 1px solid #000;
  border-radius: 1rem;
  padding: 10px;
  color: black;
`;

const CardBody = styled.div`
  margin: 10px;
  color: #777;
`;

const MaleFeMale = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff4572;
`;

const CardTitle = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

const CardText = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

const buttonStyles = `
  font-size: 0.8rem;
  padding: 0.3rem 1.0rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ParticipateButton = styled.button`
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

const RunOutButton = styled.button`
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

const MakeRoomButton = styled.button`
  margin-left: auto;
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

const PageNumContainer = styled.div``;

export default MeetingRoomView;
