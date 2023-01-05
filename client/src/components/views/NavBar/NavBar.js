import React from 'react';
import './NavBar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import HomePage from '../HomePage/HomePage';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          Dugeun
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                홈
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/SignIn">
                일단 로그인
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/SignUp">
                일단 회원가입
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                게시판
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/SignIn" element={<SignInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
      </Routes>
    </nav>
  );
}

export default NavBar;
