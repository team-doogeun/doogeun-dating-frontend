import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MypageSidemenuContainer from "../../MyPageSidemenu/MyPageSidemenuContainer";
import { getJWTCookie } from "../../../../Api/loginApi";
import UserBlindDateMeetingView from "./UserBlindDateMeetingView";

const UserBlindDateMeetingContainer = () => {
  // userId, authToken
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

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

  const getBlindDateMatches = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/Matches`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });
  };

  const getMeetingHost = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/meeting/x`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });
  };

  const getMeetingRegister = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/meeting/y`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });
  };

  const getMeetingHostStart = async () => {
    await axios
      .get(`http://localhost:8080/mypage/${userId}/meeting/z`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });
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
