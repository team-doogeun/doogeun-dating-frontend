import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

// react-query 작성 시작
// API 통신 및 비동기 상태 관리를 위한 라이브러리

// useQuery : 데이터 캐싱(임시저장)후 무의미한 api호출 안시킴
// 데이터를 가져오는 hook : get과 똑같다고 보면된다
const useAuthToken = () => {
  // 얘는 토큰을 요청하는거임
  // 얘는 error나 이런거 제어 안해도 되나?,, 모르겠음
  // isLoading, isError, error
  const {
    data: token,
    isLoading,
    isError,
    error,
  } = useQuery(["authToken"], async () => {
    // fetch : 서버에서 데이터를 받아옴(게임 업데이트 생각하면 됨)
    // 로그인 화면 : get, url (/)
    const response = await fetch("/");
    const data = await response.json();

    // 확인용 콘솔
    if (isLoading) return alert("Loading");
    if (isError) return alert(`Error : ${error.message}`);

    return data.token;
  });

  return token;
};

// db에 데이터가 있어서
// 1. 로그인이 된다면 -> isSuccess : true
// 2. 로그인이 안된다면 -> isError : true
const useLogin = () => {
  const authToken = useAuthToken();

  // 데이터를 생성, 업데이트 또는 삭제하는 데 필요한 비동기 작업을 쉽게 수행 가능
  const loginMutation = useMutation(async ({ id, pw }) => {
    // 로그인 화면 : get, url (/)
    // async, await, method, headers, body
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ id, pw }),
    });

    const data = await response.json();
    return data;
  });

  return loginMutation;
};

export { useAuthToken, useLogin };
