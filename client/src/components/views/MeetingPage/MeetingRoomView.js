import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";

// 미팅은 실시간이라 소켓통신을 기반으로 한다
// 들어올 수도 있고 나갈 수도 있다. -> 나가는건 이미 참여했다걸 확인한 후에 나간다.(서버에 get 요청 필요해 보임)

// 해야될게 디자인
// 그리고 인원이 다 차면 호스트가 카톡 아이디를 전부 받아옴
// 참가할 때 : 카카오 아이디 요청(get)

// 소켓 서버 주소에 맞게 변경
const socket = io("http://loaclhost:8080/");

const MeetingRoomView = () => {
  const [participants, setParticipants] = useState([]);

  const initSocketConnection = () => {
    if (socket) return;
    socket.connect();
  };

  const disconnectSocket = () => {
    if (socket === null || socket.connected === false) {
      return;
    }
    socket.disconnect();
    socket = undefined;
  };

  useEffect(() => {
    // 마운트시 소켓 연결
    initSocketConnection();

    // 서버로부터 미팅 방 인원 업데이트 이벤트 리스너 등록
    socket.on("participants:update", (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    // 언마운트시 소켓 연결 해제
    return () => {
      disconnectSocket();
    };
  }, []);

  const addParticipant = async () => {
    // 서버로 인원 추가 요청
    socket.emit("participants:add");

    const response = await axios.get("http://localhost:8080/~");
  };

  const removeParticipant = () => {
    // 서버로 인원 제거 요청
    socket.emit("participants:remove");
  };

  return (
    <div>
      <h1>Meeting Room</h1>
      <p>Participants: {participants.length}</p>
      <ParticipateButton onClick={addParticipant}>참여</ParticipateButton>
      <RunOutBUtton onClick={removeParticipant}>나가기</RunOutBUtton>
    </div>
  );
};

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

const RunOutBUtton = styled.button`
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

export default MeetingRoomView;
