import React, { useState, useEffect } from "react";
import UserSettingsView from "./UserSettingsView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getJWTCookie, removeJWTCookie } from "../../../Api/loginApi";
import { clearAllCookies } from "../../../Api/loginApi";

const passwordContext = new React.createContext();

const UserSettingContainer = () => {
  const navigate = useNavigate();
  const userId = getJWTCookie("userId");

  const getUserInfo = async () => {
    await axios
      .get(`http://localhost:8080/${userId}/update`, userId)
      .then((res) => {
        console.log(res);
        return res;
      });
  };

  // 비밀번호 변경시 post 쳐주기
  // 그리고 url 수정해줘야함
  // 비밀번호 변경시 다시 로그인 필요 -> 기존의 쿠키값 지워버리기

  // 개인 프로필 수정은 어떻게 할것인가? -> 논의해야함
  const changePassword = async (newPassword) => {
    const userId = getJWTCookie("userId");

    await axios
      .post(`http://localhost:8080/mypage/${userId}/passwordUpdate`, {
        newPassword: newPassword,
      })
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        clearAllCookies();
        navigate("/");
      })
      .catch((error) => {
        console.log("비밀번호를 변경하지 못했습니다");
        alert("비밀번호를 변경하지 못했습니다. 에러는 : " + error + "입니다");
      });
  };

  return (
    <UserSettingsView
      getUserInfo={getUserInfo}
      changePassword={changePassword}
    />
  );
};

export { UserSettingContainer as default, passwordContext };
