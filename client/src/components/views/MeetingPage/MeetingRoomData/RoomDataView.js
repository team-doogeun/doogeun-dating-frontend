import React from "react";
import styled from "styled-components";

const RoomDataView = ({ roomData, isHost, hostStart, deleteRoom }) => {
  return (
    <>
      <RoomDataWrapper>
        <RoomTitle>{roomData.title}</RoomTitle>
        <RoomIntro>소갯말 : {roomData.groupBlindIntroduction}</RoomIntro>
        <RoomPersonNum>
          {`현재인원) 남 ${roomData.presentMale} : 여 ${roomData.presentFemale}`}
        </RoomPersonNum>
        <UserDataWrapper>
          <MaleCol>
            {roomData.members.map((member, index) => {
              if (member.gender === "남") {
                return (
                  <div
                    key={index}
                  >{`${member.department} : (${member.age})`}</div>
                );
              } else {
                return <div key={index}>현재 없음</div>;
              }
            })}
          </MaleCol>
          <FemaleCol>
            {roomData.members.map((member, index) => {
              if (member.gender === "여") {
                return (
                  <div
                    key={index}
                  >{`${member.department} : (${member.age})`}</div>
                );
              } else {
                return <div key={index}>현재 없음</div>;
              }
            })}
          </FemaleCol>
        </UserDataWrapper>
        {isHost && (
          <BtnContainer>
            <StartBtn
              onClick={() => {
                hostStart(roomData.roomId);
              }}
            >
              시작
            </StartBtn>
            <EndBtn
              onClick={() => {
                deleteRoom(roomData.roomId);
              }}
            >
              미팅방 삭제하기
            </EndBtn>
          </BtnContainer>
        )}
      </RoomDataWrapper>
    </>
  );
};

const BtnContainer = styled.div`
  margin-top: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartBtn = styled.button`
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  width: 150px;
  color: white;
  background: transparent;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #ff4572;

  &:hover {
    transform: scale(1.05);
  }
`;

const EndBtn = styled.button`
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  width: 150px;
  color: white;
  background: transparent;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #ff4572;
  margin-top: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const RoomDataWrapper = styled.div`
  width: 100%;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-weight: 300;
`;

const RoomTitle = styled.h2`
  margin: 20px auto;
  background-color: #ff4572;
  border: 1px solid #ff4572;
  border-radius: 6px;
  max-width: 70%;
  color: white;
  max-height: 40px;
`;
const RoomIntro = styled.div`
  margin: 0 auto;
  max-width: 80%;
  margin-bottom: 20px;
`;
const RoomPersonNum = styled.div`
  color: #ff4572;
  margin-bottom: 30px;
`;

const UserDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MaleCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-right: 20px;
`;
const FemaleCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-left: 20px;
`;

export default RoomDataView;
