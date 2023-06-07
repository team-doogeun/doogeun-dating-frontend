import React, { useEffect, useState } from "react";
import RoomDataView from "./RoomDataView";
import axios from "axios";
import { getJWTCookie } from "../../../Api/loginApi";

const RoomDataContainer = ({ roomData }) => {
  const [isHost, setIsHost] = useState(true);
  const userId = getJWTCookie("userId");

  // get으로 호스트 값을 가져올 수 있는 함수 작성 요망
  // 일단 isHost true로 설정
  useEffect(() => {
    if (roomData.hostId === userId) setIsHost(true);
    else setIsHost(false);
  }, []);

  // userId
  const hostStart = async (roomId) => {
    await axios
      .post(`/group/${roomId}/achieve`, {})
      .then((res) => {
        console.log(`유저들의 카카오톡 아이디 : ${res.userId}`);
        return res;
      })
      .catch((error) => {
        console.log("방 만들기 실패 " + error);
      });
  };

  return (
    <>
      <RoomDataView
        roomData={roomData}
        isHost={isHost}
        hostStart={hostStart}
      ></RoomDataView>
    </>
  );
};

export default RoomDataContainer;
