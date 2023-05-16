import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function MyPage() {
  return (
    <div>
      <UserDataComponent></UserDataComponent>
      <ChangeMyDataComponent></ChangeMyDataComponent>
    </div>
  );
}

const FindUserID = () => {
  const location = useLocation();
  const pathname = location.pathname; // 현재 페이지의 경로
  const userId = pathname.split("/")[2]; // 경로를 슬래시('/')로 분할하고 두 번째 세그먼트를 가져오기

  return userId;
};

// 기존 유저 데이터 가져오기
const UserData = async () => {
  const userId = FindUserID();
  const url = `http://localhost:80/mypage/${userId}/myprofile`;
  const response = await axios.get(url);

  if (!response.ok) {
    throw new Error("user 정보를 가져오지 못했습니다");
  }

  // 기존에 회원정보 싹 다 가져오기
  return response.json();
};

const UserDataComponent = () => {
  const { data, isLoading, isError, error } = useQuery("users", UserData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // 기존의 개인정보 렌더링
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// user 데이터 변경
const ChangeMyData = async () => {
  const userId = FindUserID();
  const url = `http://localhost:80/mypage/${userId}/myprofile`;
  const response = await axios.post(url);

  if (!response.ok) {
    throw new Error("user 정보를 수정하지 못했습니다");
  }

  return response.json();
};

const ChangeMyDataComponent = () => {
  const userId = FindUserID(); // userId를 어떻게 찾는지에 따라 구현이 달라집니다.

  const mutation = useMutation(() => ChangeMyData(userId));

  const handleDataChange = async () => {
    try {
      await mutation.mutateAsync();
      // 성공적으로 데이터를 변경한 후에 필요한 작업을 수행합니다.
    } catch (error) {
      console.error(error);
    }
  };

  if (mutation.isLoading) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // 변경된 개인정보 렌더링
  return (
    <div>
      <button onClick={handleDataChange}>Change My Data</button>
      {mutation.isSuccess && <div>Data changed successfully</div>}
    </div>
  );
};
