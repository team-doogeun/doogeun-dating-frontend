import axios from "axios";

function setSessionCookie(sessionId) {
  // 세션 ID를 쿠키에 저장합니다.
  document.cookie = `sessionId=${sessionId}`;

  // axios 인스턴스를 생성합니다.
  const axiosInstance = axios.create({
    headers: {
      Cookie: `sessionId=${sessionId}`, // 요청 헤더에 쿠키를 추가합니다.
    },
  });

  return axiosInstance;
}

export { setSessionCookie };
