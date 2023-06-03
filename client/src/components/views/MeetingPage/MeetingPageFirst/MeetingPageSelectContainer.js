import React, { useEffect, useState } from "react";
import MeetingRoomView from "./MeetingPageSelectView";
import axios from "axios";
import { getCookieValue } from "../../../Api/loginApi";

const MeetingPageSelectContainer = () => {
  const [meetings, setMeetings] = useState([]);

  // 5초마다 리셋
  useEffect(() => {
    const intervalId = setInterval(fetchMeetings, 5000); // 5초마다 데이터 요청

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 폴링 중지
    };
  }, []);

  // userId가 맞으면 그때 데이터 넘어옴
  // 미팅방 목록 생성
  const fetchMeetings = async () => {
    try {
      const userId = getCookieValue("userId");
      const response = await axios.get(`group/${userId}`);
      const data = response.data;
      setMeetings(data);
    } catch (error) {
      console.error("Meeting 방 정보 가져오기 실패:", error);
    }
  };

  // 입장 버튼
  const registerIn = async (roomId) => {
    await axios
      .post(`/group/${roomId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("방에 입장하지 못함" + error);
      });
  };

  // 나가기 기능
  const registerOut = async (roomId, title, userId) => {
    await axios
      .get(`/group/${roomId}/exit`, {
        title: title,
        userId: userId,
      })
      .then(() => {
        console.log("방 나가기 성공");
      })
      .catch((error) => {
        console.log("방 나가기 실패" + error);
      });
  };

  // 상세정보 확인에서 방 정보 확인
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

  // test data
  const testData = [
    {
      id: "1",
      title: "건전한 만남을 원한다면?",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "2",
      title: "공대 2:2 미팅할 사람~",
      maleNum: "2",
      femaleNum: "2",
      capacity: "4",
      groupBlindCategory: "2:2",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "3",
      title: "재밌게 놀고 친하게 지낼 분들 찾습니다~",
      maleNum: "4",
      femaleNum: "4",
      capacity: "8",
      groupBlindCategory: "4:4",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "4",
      title: "안녕하세요~2대2로 미팅해요",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "5",
      title: "컴퓨터공학부 이승밈입니다.",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "6",
      title: "컴퓨터공학부입니다.",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
  ];

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
