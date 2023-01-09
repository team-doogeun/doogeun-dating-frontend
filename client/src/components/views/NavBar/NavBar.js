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
    <nav style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/BlindDate" element={<BlindDatePage />}></Route>
        <Route path="/Meeting" element={<MeetingPage />}></Route>
        <Route path="/Board" element={<PostView />}></Route>
        <Route path="/MyInfo" element={<MyPage />}></Route>
        <Route path="/SignIn" element={<SignInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
      </Routes>
      <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <NavLink to="/">두근</NavLink>
        </div>
        <div>
          <NavLink to="/BlindDate">소개팅</NavLink>
        </div>
        <div>
          <NavLink to="/Meeting">미팅</NavLink>
        </div>
        <div>
          <NavLink to="/Board">게시판</NavLink>
        </div>
        <div>
          <NavLink to="/MyInfo">마이페이지</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
