import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.css";
import ModalComponent from "../SmallComponent/ModalComponent";
import { setSessionCookie } from "../SessionControl/Session";

function NavBar() {
  // 일단 Login 세션 구현
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때, 서버에서 세션 확인 API를 호출하여 로그인 상태를 가져옵니다.
  // 그렇다면 브라우저를 다시 킬때를 말하는거겠지?
  useEffect(() => {
    // 세션 쿠키를 읽습니다.
    // 쿠키의 값을 가져오기 위해 정규식을 사용하는 코드
    // 정규식의 결과로 반환되는 문자열 : sessionId의 쿠키값
    // 쿠키가 존재하지 않는다면 빈 문자열 반환
    const sessionId = document.cookie.replace(
      /(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // 세션 쿠키가 없으면 더 이상 실행하지 않습니다.
    if (!sessionId) return;

    // axios 인스턴스를 생성합니다.
    const axiosInstance = setSessionCookie(sessionId);

    // 서버에서 세션 확인 API를 호출합니다.
    axiosInstance
      .get("/api/session")
      .then((res) => setIsLoggedIn(res.data.isLoggedIn))
      .catch((err) => console.error(err));
  }, []);

  // 로그인 버튼 클릭 시, 서버에서 로그인 API를 호출합니다.
  const handleLogin = () => {
    axios
      .post("/api/login")
      .then((res) => {
        setIsLoggedIn(true);

        // 세션 ID를 쿠키에 저장합니다.
        setSessionCookie(res.data.sessionId);
      })
      .catch((err) => console.error(err));
  };

  // 로그아웃 버튼 클릭 시, 서버에서 로그아웃 API를 호출합니다.
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        setIsLoggedIn(false);

        // 세션 ID 쿠키를 삭제합니다.
        // 이를 위해 "expires" 속성을 설정하여 쿠키 만료일을 1970년 1월 1일로 설정하고
        // "path" 속성을 설정하여 모든 경로에서 해당 쿠키를 삭제하도록 지정합니다.
        document.cookie =
          "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top bg-body-tertiary">
      <div class="container-fluid touchItem">
        <a class="navbar-brand text-white touchItem" href="/">
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
                class="nav-link text-white touchItem"
                aria-current="page"
                href="/blinddate"
              >
                소개팅
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link text-white touchItem" href="/meeting">
                미팅
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white touchItem" href="/mypage">
                마이페이지
              </a>
            </li>
          </ul>
          {/* startArea 이 부분은 css 나중에 수정 */}
          <div className="startArea">
            {isLoggedIn ? (
              <div>
                <p>Welcome, user!</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
