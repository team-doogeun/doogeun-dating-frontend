import { useAuthToken } from "./useLogin";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const authToken = useAuthToken();
  const boundary = "----WebKitFormBoundaryExample"; // 경계 문자열

  const registerMutation = useMutation(async (userData) => {
    const formData = new FormData();
    const imageData1 = localStorage.getItem("basicFilePath");
    const imageData2 = localStorage.getItem("secondFilePath");
    const imageData3 = localStorage.getItem("thirdFilePath");

    if (userData) formData.append("user", JSON.stringify(userData));

    // 첫번쨰 이미지 있으면 formData에 데이터 값 넣기
    if (imageData1) {
      formData.append("basicFilePath", imageData1);
      if (imageData2) formData.append("secondFilePath", imageData2);
      else formData.append("secondFilePath", "");
      if (imageData3) formData.append("thirdFilePath", imageData3);
      else formData.append("thirdFilePath", "");
    }

    for (const [key, value] of formData.entries()) {
      console.log(key);
      console.log(value);
    }

    const headers = new Headers();
    headers.append("Content-Type", `multipart/form-data; boundary=${boundary}`);

    // post url : (/)
    // fetch의 경우 method를 무조건 명시해줘야함
    // 일단 경로는 http://localhost:80/user/signup
    const response = await fetch("http://localhost:80/users/signup", {
      method: "POST",
      headers: headers,
      // Authorization: `Bearer ${authToken}`,
      body: formData,
    });

    // 네트워크 오류
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(formData);
    const data = await response.json();
    return data;
  });

  return registerMutation;
};

export { useRegister };
