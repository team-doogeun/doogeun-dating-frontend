import React, { useEffect, useState } from "react";
import axios from "axios";
import { getJWTCookie } from "../../../../Api/loginApi";
import UserBlindDateMeetingView from "./UserBlindDateMeetingView";

const UserBlindDateMeetingContainer = () => {
  // userId, authToken
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

  // 내가 호감 보낸 사람
  const getBlindDateToLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/toLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });

    console.log(response);
    return response;
  };

  // 내게 호감 보낸 사람
  const getBlindDatefromLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/fromLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  // 최종매치 유저
  const getBlindDateMatches = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/finalMatches`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingHost = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/my-rooms`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingRegister = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/entering`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getMeetingHostStart = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/achieve`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });

    return response;
  };

  return (
    <UserBlindDateMeetingView
      getBlindDateToLike={getBlindDateToLike}
      getBlindDatefromLike={getBlindDatefromLike}
      getBlindDateMatches={getBlindDateMatches}
      getMeetingHost={getMeetingHost}
      getMeetingRegister={getMeetingRegister}
      getMeetingHostStart={getMeetingHostStart}
    />
  );
};

export default UserBlindDateMeetingContainer;
