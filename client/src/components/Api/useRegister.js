import { useAuthToken } from "./useLogin";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const authToken = useAuthToken();

  const imageData = localStorage.getItem("basicFilePath");
  const formData = new FormData();
  if (imageData !== null) {
    formData.append("image", imageData);
    console.log(formData);
    console.log(imageData);
  }

  const registerMutation = useMutation(async (userData, formData) => {
    // post url : (/)
    // fetch의 경우 method를 무조건 명시해줘야함
    // 일단 경로는 http://localhost:80/user/signup
    const response = await fetch("http://localhost:80/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData, formData),
    });

    // 네트워크 오류
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);
    return data;
  });

  return registerMutation;
};

export { useRegister };
