import React, { useState } from 'react';
import './NavBar.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ModalComponent from '../SmallComponent/ModalComponent';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-element">
        <div className="menu__left">
          <ListComponent
            classname="list"
            linkname="/myprofile"
            pagename="두근"
          />
          <ListComponent
            classname="list"
            linkname="/BlindDate"
            pagename="소개팅"
          />
          <ListComponent classname="list" linkname="/Meeting" pagename="미팅" />
          <ListComponent classname="list" linkname="/Board" pagename="게시판" />
          <ListComponent
            classname="list"
            linkname="/MyInfo"
            pagename="마이페이지"
          />
        </div>
        <div className="buttons__right">
          <ModalComponent mainContent="Login" contentName="로그인" />
          <button
            className="buttons"
            onClick={(e) => {
              window.location.href = '/signup';
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

const ListComponent = (props) => {
  return (
    <div className={props.classname}>
      <Link to={props.linkname}>
        <li>{props.pagename}</li>
      </Link>
    </div>
  );
};

export default NavBar;
