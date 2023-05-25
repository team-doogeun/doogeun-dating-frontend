import React, { useEffect, useState } from "react";
import MeetingRoomView from "./MeetingRoomView";
import axios from "axios";
import { getCookieValue } from "../../Api/loginApi";

const MeetingRoomContainer = () => {
  // const [meetings, setMeetings] = useState([]);

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
      console.error("Meeting 정보 가져오기 실패:", error);
    }
  };

  // 만들기 기능
  // 만들기 눌렀을 때 : 모달창 띄워서 userData입력받기
  const makeRoom = async (userData) => {
    await axios
      .post("/group/register", {
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
  const registerIn = async (id, title) => {
    const userId = getCookieValue("userId");

    await axios
      .post(`/group/${userId}`, {
        id: id,
        title: title,
      })
      .then((res) => {
        console.log(res.id + "," + res.title + "에 입장했습니다");
      })
      .catch((error) => {
        console.log("방에 입장하지 못함" + error);
      });
  };

  // 나가기 기능
  const registerOut = async (id, title) => {
    await axios
      .get("/group", {
        id: id,
        title: title,
      })
      .then(() => {
        console.log("방 나가기 성공");
      })
      .catch((error) => {
        console.log("방 나가기 실패" + error);
      });
  };

  // test data
  const meetings = [
    {
      id: "1",
      title: "건전한",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "2",
      title: "안전한",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "3",
      title: "구라임",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "4",
      title: "안녕임",
      maleNum: "3",
      femaleNum: "3",
      capacity: "6",
      groupBlindCategory: "3:3",
      groupBlindStatus: "NOT_FULL",
      groupBlindIntroduction: "안녕하세요~",
    },
    {
      id: "5",
      title: "ㅎㅇ임",
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
      makeRoom={makeRoom}
      registerIn={registerIn}
      registerOut={registerOut}
    ></MeetingRoomView>
  );
};

export default MeetingRoomContainer;
