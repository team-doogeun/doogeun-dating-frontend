import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView";
import axios from "axios";
import { getJWTCookie, clearAllCookies } from "../../Api/loginApi";

const ProfileContainer = ({ profileImageUrl }) => {
  const navigator = useNavigate();
  const userName = getJWTCookie("name");

  // 로그아웃 url은?
  const logoutHandler = async () => {
    await axios
      .post(
        "http://localhost:8080/users/logout",
        {},
        {
          headers: {
            Authorization: getJWTCookie("jwtAccessToken"),
          },
        }
      )
      .then((res) => {
        clearAllCookies();
        if (res.data.status === "200")
          console.log("정상적으로 로그아웃하였습니다.");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ProfileView
      logoutHandler={logoutHandler}
      userName={userName}
      navigator={navigator}
      profileImageUrl={profileImageUrl}
    />
  );
};

export default ProfileContainer;
