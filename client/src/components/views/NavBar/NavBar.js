import React from 'react';
import './NavBar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';

function NavBar() {
  return (
    <nav>
      <ul className="navContainer">
        <div className="leftItems">
          <Link to="/">Home</Link>
        </div>
        <div className="leftItems">
          <Link to="/SignIn">SignIn</Link>
        </div>
        <div className="leftItems">
          <Link to="/SignUp">SignUp</Link>
        </div>
        <div>
          <button className="rightItems">로그인</button>
          <button className="rightItems">회원가입</button>
        </div>
      </ul>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/SignIn" element={<SignInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
      </Routes>
    </nav>
  );
}

export default NavBar;
