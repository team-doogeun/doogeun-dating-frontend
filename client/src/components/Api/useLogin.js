import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

// react-query 작성 시작
// useQuery : 데이터 캐싱(임시저장)후 무의미한 api호출 안시킴
const useAuthToken = () => {
  const { data: token } = useQuery("authToken", async () => {
    // fetch : 서버에서 데이터를 받아옴(게임 업데이트)
    /* 서버 url은 다시 설정해야됨 */
    const response = await fetch("/api/auth/token");
    const data = await response.json();
    return data.token;
  });

  return token;
};

const useLogin = () => {
  const authToken = useAuthToken();

  // 데이터를 생성, 업데이트 또는 삭제하는 데 필요한 비동기 작업을 쉽게 수행 가능
  const loginMutation = useMutation(async ({ email, password }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  });

  return loginMutation;
};

export { useAuthToken, useLogin };
