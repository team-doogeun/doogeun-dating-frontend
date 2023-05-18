import React, { useState, useEffect } from "react";
import UserSettingsView from "./UserSettingsView";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const passwordContext = new React.createContext();

const UserSettingContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // 임의 url
  const url = "http://localhost:8080/change-password";

  // 비밀번호 변경시 post 쳐주기
  const changePassword = async () => {
    const response = await axios
      .put(url, {
        newPassword: newPassword,
      })
      .then(() => {
        setNewPassword();
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log("문제입니다");
        alert(error + " 입니다");
      });
  };

  return (
    <passwordContext.Provier value={setNewPassword}>
      <UserSettingsView navigate={navigate} changePassword={changePassword} />
    </passwordContext.Provier>
  );
};

export { UserSettingContainer as default, passwordContext };
