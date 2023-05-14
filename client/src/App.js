import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import GmarketSansTTFBold from "./fonts/GmarketSansTTFBold.ttf";
import "./App.css";
// 작업하는 페이지
import HomePage from "./components/views/HomePage/HomePage";
import BlindDatePage from "./components/views/BlindDatePage/BilndDatePage";
import MeetingPage from "./components/views/MeetingPage/MeetingPage";
import MyProfile from "./components/views/SignUpPage/MyProfile";
import DetailProfile from "./components/views/SignUpPage/DetailProfile";
import IdealProfile from "./components/views/SignUpPage/IdealProfile";
import FindPassword from "./components/views/FindPassword/FindPassword";
import PageNotFound from "./components/views/PageNotFound/PageNotFound";
const GlobalStyle = createGlobalStyle`
@font-face {
        font-family: 'GmarketSansTTFBold';
        src: local('GmarketSansTTFBold'), local('GmarketSansTTFBold');
        font-style: normal;
        src: url(${GmarketSansTTFBold}) format('truetype');
  }

  body {
    width:100%;
    margin-top: 100px;
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
          <Route path="/blinddate" element={<BlindDatePage />}></Route>
          <Route path="/meeting" element={<MeetingPage />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/detailprofile" element={<DetailProfile />}></Route>
          <Route path="/users/signup" element={<IdealProfile />}></Route>
          <Route path="/find" element={<FindPassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
