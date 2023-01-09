import React from 'react';
import './NavBar.css';
import { NavLink, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import HomePage from '../HomePage/HomePage';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import BlindDatePage from '../BlindDatePage/BilndDatePage';
import MeetingPage from '../MeetingPage/MeetingPage';
import MyPage from '../MyPage/MyPage';
import PostView from '../../Board/PostView';

function NavBar() {
  return (
    <div className="navbar">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/BlindDate" element={<BlindDatePage />}></Route>
        <Route path="/Meeting" element={<MeetingPage />}></Route>
        <Route path="/Board" element={<PostView />}></Route>
        <Route path="/MyInfo" element={<MyPage />}></Route>
        <Route path="/SignIn" element={<SignInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
      </Routes>
      <ul className="navbar-element">
        <div className="menu">
          <li>
            <a href="/">두근</a>
          </li>
        </div>
        <div className="menu">
          <li>
            <a href="/BlindDate">소개팅</a>
          </li>
        </div>
        <div className="menu">
          <li>
            <a href="/Meeting">미팅</a>
          </li>
        </div>
        <div className="menu">
          <li>
            <a href="/Board">게시판</a>
          </li>
        </div>
        <div className="menu">
          <li>
            <a href="/MyInfo">마이페이지</a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default NavBar;
