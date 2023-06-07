import React from "react";
import styled from "styled-components";

const RoomDataView = ({ roomData, isHost, hostStart }) => {
  return (
    <>
      <RoomDataWrapper>
        <RoomTitle>{roomData.title}</RoomTitle>
        <RoomIntro>소갯말 : {roomData.groupBlindIntroduction}</RoomIntro>
        <RoomPersonNum>
          {`현재인원) 남 ${roomData.maleNum} : 여 ${roomData.femaleNum}`}
        </RoomPersonNum>
        <UserDataWrapper>
          <MaleCol>
            <div>{`${roomData.Male1Department}(${roomData.Male1Age})`}</div>
            <div>{`${roomData.Male2Department}(${roomData.Male2Age})`}</div>
            <div>{`${roomData.Male3Department}(${roomData.Male3Age})`}</div>
          </MaleCol>
          <FeMaleCol>
            <div>{`${roomData.Female1Department}(${roomData.Female1Age})`}</div>
            <div>{`${roomData.Female2Department}(${roomData.Female2Age})`}</div>
            <div>{`${roomData.Female3Department}(${roomData.Female3Age})`}</div>
          </FeMaleCol>
        </UserDataWrapper>
        {isHost && (
          <BtnContainer>
            <StartBtn onClick={hostStart(roomData.id)}>시작</StartBtn>
          </BtnContainer>
        )}
      </RoomDataWrapper>
    </>
  );
};

const BtnContainer = styled.div`
  margin-top: 40px;
`;

const StartBtn = styled.button`
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  width: 80px;
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
  max-width: 60%;
  color: white;
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
const FeMaleCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-left: 20px;
`;

export default RoomDataView;
