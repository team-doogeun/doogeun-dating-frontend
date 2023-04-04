import React, { useState } from "react";
import "./NavBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ModalComponent from "../SmallComponent/ModalComponent";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top bg-body-tertiary">
      <div class="container-fluid touchItem">
        <a class="navbar-brand touchItem" href="/">
          DuGeun
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link touchItem"
                aria-current="page"
                href="/blinddate"
                style={{ color: "white" }}
              >
                소개팅
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link touchItem"
                href="/meeting"
                style={{ color: "white" }}
              >
                미팅
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link touchItem"
                href="/mypage"
                style={{ color: "white" }}
              >
                마이페이지
              </a>
            </li>
          </ul>
          <div className="buttons__right">
            <ModalComponent
              mainContent="Login"
              contentName="로그인"
              header="로그인"
            />
            <button
              className="signUp"
              onClick={(e) => {
                window.location.href = "/myprofile";
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
