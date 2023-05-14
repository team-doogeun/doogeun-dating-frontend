import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "../../Modal/LoginModal";
import { setSessionCookie } from "../SessionControl/Session";
import SingInContainer from "../SignInPage/SignInContainer";
import Logo from "../../../Img/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function NavBar() {
  // 일단 Login 세션 구현
  const navigator = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <HeaderContainer>
        <LogoImage src={Logo} alt="logo" onClick={() => navigator("/")} />
        <Nav>
          {isLoggedIn ? (
            <div>
              <p>Welcome, user!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <RegisterButton
                onClick={() => {
                  navigator("/myprofile");
                }}
              >
                회원가입
              </RegisterButton>
              <LoginButton
                onClick={() => {
                  setLoginModal(true);
                }}
              >
                로그인
              </LoginButton>
              {loginModal && (
                <Modal
                  CloseModal={() => {
                    setLoginModal(!loginModal);
                  }}
                >
                  <SingInContainer />
                </Modal>
              )}
            </>
          )}
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.scrollPosition >= 0
      ? "0 0.125rem 0.0625rem -0.0625rem #d9d9d9"
      : "none"};
  transition: box-shadow 0.5s ease;
`;

const HeaderContainer = styled.div`
  height: 6.25rem;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const Nav = styled.nav`
  display: flex;
  margin-left: auto;
`;

const buttonStyles = `
  font-size: 1rem; 
  padding: 0.5rem 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  cursor: pointer;
`;

const LoginButton = styled.button`
  border: 0.0625rem solid #ff4572;
  border-radius: 0.4375rem;
  font-weight: 700;
  background: #ff426f;
  color: #fff;
  ${buttonStyles}
`;

const RegisterButton = styled.button`
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

export default NavBar;
