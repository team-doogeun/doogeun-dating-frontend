import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/views/NavBar/NavBar";
import PostList from "./components/Board/PostList";

// 작업하는 페이지 가져오기
import HomePage from "./components/views/HomePage/HomePage";
import BlindDatePage from "./components/views/BlindDatePage/BilndDatePage";
import MeetingPage from "./components/views/MeetingPage/MeetingPage";
import MyProfile from "./components/views/SignUpPage/MyProfile";
import DetailProfile from "./components/views/SignUpPage/DetailProfile";
import IdealProfile from "./components/views/SignUpPage/IdealProfile";

function App() {
  return (
    <div className="superContainer">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/BlindDate" element={<BlindDatePage />}></Route>
        <Route path="/Meeting" element={<MeetingPage />}></Route>
        <Route path="/myprofile" element={<MyProfile />}></Route>
        <Route path="/detailprofile" element={<DetailProfile />}></Route>
        <Route path="/idealprofile" element={<IdealProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
