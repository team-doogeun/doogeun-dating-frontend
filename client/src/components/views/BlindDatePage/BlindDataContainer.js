import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BlindDateView from "./BilndDateView";

const FindUserID = () => {
  // url에서 userId 가져오기
  const location = useLocation();
  const pathname = location.pathname; // 현재 페이지의 경로
  const userId = pathname.split("/")[2]; // 경로를 슬래시('/')로 분할하고 두 번째 세그먼트를 가져오기

  return userId;
};

const GetMatchUser = async () => {
  const userId = FindUserID();
  const response = await axios.get(
    `http://localhost:80/blindDate/${userId}/mathces`
  );
  return response.data;
};

const DataFetchingComponent = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["blindDate"],
    GetMatchUser,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      refetchOnMount: true, // 컴포넌트가 마운트될 때 데이터를 자동으로 다시 가져옵니다.
      refetchInterval: 24 * 60 * 60 * 1000, // 24시간마다 데이터를 자동으로 다시 가져옵니다.

      onSuccess: (data) => {
        // 성공시 콘솔찍기
        console.log(data);
      },
      onError: (e) => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다.
        console.log(e.message);
      },
    }
  );

  // 매주 월요일에 데이터 갱신
  // 여걸 어디에 넣어놔야지? 카드?
  const checkAndRefetch = () => {
    const today = new Date();
    if (today.getDay() === 1) {
      refetch(); // 월요일에만 데이터를 다시 요청합니다.
    }
  };

  // 좋아요 누르기
  // 디자인된 사진 안에 넣어놓기
  const handleLike = async () => {
    try {
      await axios.post("http://localhost:80/blindDate/like", {
        userId: String(FindUserID()),

        /* 첫번째 유저인지, 두번째 유저인지 구분필요 */
        // 분기로 처리해야됨
        targetUserId: data.userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    console.log("Loading");
  }

  if (isError) {
    console.log("Error");
  }

  // 유저 정보 출력
  // 1주일에 2명 소개
  return <BlindDateView userData={data}></BlindDateView>;
};

// 좋아요 버튼
const LikeButton = ({ onClick }) => {
  return <button onClick={onclick}>Like</button>;
};

export { DataFetchingComponent };
