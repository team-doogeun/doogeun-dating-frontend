import React from "react";
import { useNavigate } from "react-router-dom";
import MypageSidemenuView from "./MyPageSidemenuView";

const MypageSidemenuContanier = (props) => {
  const navigate = useNavigate();

  const onUserSettingClick = () => {
    navigate("/my-page");
  };
  const onMyPostsClick = () => {
    navigate("/mypage/my-posts");
  };
  const onScrapClick = () => {
    navigate("/mypage/my-scrap");
  };
  return (
    <MypageSidemenuView
      currentMenu={props.currentMenu}
      onUserSettingClick={onUserSettingClick}
      onMyPostsClick={onMyPostsClick}
      onScrapClick={onScrapClick}
    />
  );
};

export default MypageSidemenuContanier;
