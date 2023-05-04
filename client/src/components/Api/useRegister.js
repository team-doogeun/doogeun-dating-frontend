import { useAuthToken } from "./useLogin";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  const authToken = useAuthToken();

  const registerMutation = useMutation(async (userData) => {
    // post url : (/)
    // fetch의 경우 method를 무조건 명시해줘야함
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  });

  return registerMutation;
};

export { useRegister };
