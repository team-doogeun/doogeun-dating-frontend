import React, { useState } from 'react';
import './NavBar.css';
import { NavLink, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import HomePage from '../HomePage/HomePage';
import BlindDatePage from '../BlindDatePage/BilndDatePage';
import MeetingPage from '../MeetingPage/MeetingPage';
import PostView from '../../Board/PostView';
import MyPage from '../MyPage/MyPage';

import ModalComponent from '../SignInPage/SignInModal'; // SignIn
import SignUpPage from '../SignUpPage/SignUpPage';

function NavBar() {
  <Routes>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/BlindDate" element={<BlindDatePage />}></Route>
    <Route path="/Meeting" element={<MeetingPage />}></Route>
    <Route path="/Board" element={<PostView />}></Route>
    <Route path="/MyInfo" element={<MyPage />}></Route>
    <Route path="/signup" element={<SignUpPage />}></Route>
  </Routes>;

  return (
    <div className="navbar">
      <div className="navbar-element">
        <div className="menu__left">
          <ListComponent classname="list" linkname="/" pagename="두근" />
          <ListComponent classname="list" linkname="/BlindDate" pagename="소개팅" />
          <ListComponent classname="list" linkname="/Meeting" pagename="미팅" />
          <ListComponent classname="list" linkname="/Board" pagename="게시판" />
          <ListComponent classname="list" linkname="/MyInfo" pagename="마이페이지" />
        </div>
        <div className="buttons__right">
          <ContentModalComponent mainContent="Login" />
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

const ContentModalComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button className="buttons" onClick={openModal}>
        {props.contentName}
      </button>
      <ModalComponent open={modalOpen} close={closeModal} header={props.contentName} mainContent={props.mainContent}></ModalComponent>
    </React.Fragment>
  );
};

export { NavBar as default, ContentModalComponent };
