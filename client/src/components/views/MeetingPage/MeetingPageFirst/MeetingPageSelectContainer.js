import React, { useEffect, useState } from "react";
import MeetingRoomView from "./MeetingPageSelectView";
import axios from "axios";
import { getJWTCookie } from "../../../Api/loginApi";

const MeetingPageSelectContainer = () => {
  const authToken = getJWTCookie("jwtAccessToken");

  const [meetings, setMeetings] = useState([]);
  const [isUserIn, setIsUserIn] = useState(false);

  // Polling : 주기적인 업데이트 느낌
  // 5초마다 미팅방 데이터 로드
  // 근데 데이터가 너무 많아서 fetchMeetings의 실행시간이 5초보다 길면 5초 이후에 실행된다
  // 추후에 수정가능
  useEffect(() => {
    // 처음엔 한번 데이터 로드
    loadMeetings();

    const intervalId = setInterval(loadMeetings, 10000); // 10초마다 데이터 요청

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 폴링 중지
    };
  }, []);

  // userId가 맞으면 그때 데이터 넘어옴
  // 미팅방 목록 생성
  const loadMeetings = async () => {
    try {
      const response = await axios
        .get(`http://localhost:8080/group`)
        .then((res) => {
          return res;
        });
      const meetingData = response.data;
      setMeetings(meetingData);
    } catch (error) {
      console.error("Meeting 방 정보 가져오기 실패:", error);
    }
  };

  // 입장 버튼
  const registerIn = async (roomId) => {
    await axios
      .post(`http://localhost:8080/group/${roomId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("방에 입장하지 못함" + error);
      });
  };

  // 나가기 기능
  const registerOut = async (roomId, title) => {
    const userId = getJWTCookie("userId");
    const userData = await checkRoomData(roomId);
    const userIn = userData.userId.includes(userId);
    setIsUserIn(userIn);

    await axios
      .get(
        `http://localhost:8080/group/${roomId}/exit`,
        {
          title: title,
          userId: userId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then(() => {
        console.log("방 나가기 성공");
      })
      .catch((error) => {
        console.log("방 나가기 실패" + error);
      });
  };

  // 상세정보 확인에서 방 정보 확인
  const checkRoomData = async (roomId) => {
    const userId = getJWTCookie("userId");

    const response = await axios
      .get(
        `http://localhost:8080/group/${roomId}/info`,
        {
          userId: userId,
          roomId: roomId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response.data;
  };

  return (
    <MeetingRoomView
      meetings={meetings}
      registerIn={registerIn}
      registerOut={registerOut}
      checkRoomData={checkRoomData}
    ></MeetingRoomView>
  );
};

export default MeetingPageSelectContainer;
