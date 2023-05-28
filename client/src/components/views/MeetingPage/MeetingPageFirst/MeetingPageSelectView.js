import React, { useState } from 'react';
import styled from 'styled-components';
import BottomImage from '../../../../Img/Rectangle 2.png';
import Pagination from '../../../Pagination/Pagination';

const MeetingPageSelectView = () => {
  const [createRoom, setCreateRoom] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomSize, setRoomSize] = useState('2');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: '건전한 만남을 원하면 들어오세요',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
    {
      id: '2',
      title: '공대 3:3 미팅할 사람~',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
    {
      id: '3',
      title: '친하게 지낼 분들 들어오세요',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
    {
      id: '4',
      title: '안녕하세요~2대2로 미팅해요',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
    {
      id: '5',
      title: '컴퓨터공학부 이승밈입니다.',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
    {
      id: '6',
      title: '컴퓨터공학부입니다.',
      maleNum: '3',
      femaleNum: '3',
      capacity: '6',
      groupBlindCategory: '3:3',
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    },
  ]);

  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const meetingsToShow = meetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateRoom = () => {
    const newRoom = {
      id: meetings.length + 1,
      title: roomTitle,
      maleNum: roomSize,
      femaleNum: roomSize,
      capacity: roomSize * 2,
      groupBlindCategory: `${roomSize}:${roomSize}`,
      groupBlindStatus: 'NOT_FULL',
      groupBlindIntroduction: '안녕하세요~',
    };
    setMeetings([...meetings, newRoom]);
    setCreateRoom(false);
  };

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
                <RoomTitle>{room.title}</RoomTitle>
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
                <StyledLabel>방 제목</StyledLabel>
                <StyledInput
                  type="text"
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                />
              </InputWrapper>
              <SelectWrapper>
                <StyledLabel>인원 수</StyledLabel>

                <ButtonWrapper>
                  <RoomSizeButton
                    selected={roomSize === '2'}
                    onClick={() => setRoomSize('2')}
                  >
                    2대2
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === '3'}
                    onClick={() => setRoomSize('3')}
                  >
                    3대3
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === '4'}
                    onClick={() => setRoomSize('4')}
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

const MakeRoomButton = styled(StyledButton)``;

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

const RoomCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  height: 380px;
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

const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  text-align: left;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 5px;
`;

const RoomSizeButton = styled.button`
  width: 100px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#ff2559' : 'white')};
  color: ${(props) => (props.selected ? '#fff' : '#252525')};
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
  padding: 2rem;
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
