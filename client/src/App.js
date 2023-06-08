import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import GmarketSansTTFBold from "./fonts/GmarketSansTTFBold.ttf";
import "./App.css";
// 작업하는 페이지
import HomePage from "./components/views/HomePage/HomePage";
import BlindDatePage from "./components/views/BlindDatePage/BlindDateContainer";
import MeetingPage from "./components/views/MeetingPage/MeetingPageFirst/MeetingPageSelectContainer";
import MyProfile from "./components/views/SignUpPage/MyProfile";
import DetailProfile from "./components/views/SignUpPage/DetailProfile";
import FindPasswordContainer from "./components/views/FindPassword/FindPasswordContainer";
import PageNotFound from "./components/views/PageNotFound/PageNotFound";
import UserSettingContainer from "./components/views/MyPage/UserSettings/UserSettingsContainer";
import MeetingPageSelectContainer from "./components/views/MeetingPage/MeetingPageFirst/MeetingPageSelectContainer";
import PrivateRoute from "./PrivateRoute";
import UserBlindDateMeetingView from "./components/views/MyPage/UserSettings/UserBlindDateMeeting/UserBlindDateMeetingView";

const GlobalStyle = createGlobalStyle`
@font-face {
        font-family: 'GmarketSansTTFBold';
        src: local('GmarketSansTTFBold'), local('GmarketSansTTFBold');
        font-style: normal;
        src: url(${GmarketSansTTFBold}) format('truetype');
  }

  body {
    width:100%;
    margin-top: 80px;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="superContainer">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/blindDate"
            element={
              <PrivateRoute>
                <BlindDatePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/group"
            element={
              <PrivateRoute>
                <MeetingPageSelectContainer />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/detailprofile" element={<DetailProfile />}></Route>
          <Route path="/find" element={<FindPasswordContainer />} />
          <Route path="/*" element={<PageNotFound />} />
          {/* 마이페이지 기능 테스트, 디자인  */}
          <Route
            path="/my-page"
            element={
              // <PrivateRoute>
              <UserSettingContainer />
              //</PrivateRoute>
            }
          />
          {/* 소개팅방 */}
          <Route
            path="/my-page/blindDate/toLike"
            element={<UserBlindDateMeetingView />}
          />
          <Route
            path="/my-page/blindDate/fromLike"
            element={<UserBlindDateMeetingView />}
          />
          <Route
            path="/my-page/blindDate/matches"
            element={<UserBlindDateMeetingView />}
          />
          {/* 미팅방 */}
          <Route
            path="/my-page/meeting/x"
            element={<UserBlindDateMeetingView />}
          />
          <Route
            path="/my-page/meeting/y"
            element={<UserBlindDateMeetingView />}
          />
          <Route
            path="/my-page/meeting/z"
            element={<UserBlindDateMeetingView />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
