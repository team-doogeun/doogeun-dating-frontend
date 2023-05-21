import React from "react";
import MeetingRoomView from "./MeetingRoomView";
import io from "socket.io-client";

const MeetingRoomContainer = () => {
  const socket = io("http://loaclhost:8080/");

  // 소켓 연결
  const initSocketConnection = () => {
    if (socket) return;
    socket.connect();
  };

  // 소켓 끊기
  const disconnectSocket = () => {
    if (socket === null || socket.connected === false) {
      return;
    }
    socket.disconnect();
    socket = undefined;
  };

  return (
    <MeetingRoomView
      socket={socket}
      initSocketConnection={initSocketConnection}
      disconnectSocket={disconnectSocket}
    ></MeetingRoomView>
  );
};

export default MeetingRoomContainer;
