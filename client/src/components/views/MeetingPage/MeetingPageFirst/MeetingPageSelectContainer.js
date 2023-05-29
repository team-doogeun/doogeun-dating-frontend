import React, { useEffect, useState } from "react";
import MeetingRoomView from "./MeetingPageSelectView";
import axios from "axios";
import { getCookieValue } from "../../../Api/loginApi";

const MeetingPageSelectContainer = () => {
  const [meetings, setMeetings] = useState([]);

  // useEffect(() => {
  //   fetchMeetings();
  // }, []);

  // userId가 맞으면 그때 데이터 넘어옴
  // 미팅방 목록 생성
  const fetchMeetings = async () => {
    try {
      const userId = getCookieValue("userId");
      const response = await axios.get(`group/${userId}`);
      const data = response.data;
      // setMeetings(data);
    } catch (error) {
      console.error("Meeting 방 정보 가져오기 실패:", error);
    }
  };

  // userId
  const hostStart = async (roomId) => {
    await axios
      .post(`/group/achieve/${roomId}`, {})
      .then((res) => {
        console.log(`유저들의 카카오톡 아이디 : ${res}`);
      })
      .catch((error) => {
        console.log("방 만들기 실패 " + error);
      });
  };

  // 만들기 기능
  // 만들기 눌렀을 때 : 모달창 띄워서 userData입력받기
  const makeRoom = async (userData) => {
    await axios
      .post(`/group/new/${userData.title}`, {
        userData,
      })
      .then((res) => {
        console.log(
          `남 : ${res.maleNum}, 여 : ${res.femaleNum} 방을 만들었습니다`
        );
      })
      .catch((error) => {
        console.log("방 만들기 실패 " + error);
      });
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

  // test data
  const testData = [
    {
      id: "1",
      title: "건전한 만남을 원하면 들어오세요",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "2",
      title: "공대 3:3 미팅할 사람~",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "3",
      title: "친하게 지낼 분들 들어오세요",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
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
      meetings={testData}
      registerIn={registerIn}
      registerOut={registerOut}
    ></MeetingRoomView>
  );
};

export default MeetingPageSelectContainer;
