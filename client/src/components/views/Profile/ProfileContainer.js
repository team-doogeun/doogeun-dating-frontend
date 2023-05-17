import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "./ProfileView";
import axios from "axios";
import { deleteCookie, getCookieValue } from "../../Api/loginApi";

const ProfileContainer = ({ profileImageUrl }) => {
  const navigator = useNavigate();
  const userName = getCookieValue("name");

  const logoutHandler = async () => {
    await axios
      .post(
        "http://localhost:8080/users/logout",
        {},
        {
          headers: {
            sessionId: getCookieValue("sessionId"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        deleteCookie("sessionId");
        deleteCookie("userId");
        deleteCookie("name");

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