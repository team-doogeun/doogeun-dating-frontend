import React, { useState } from "react";
import axios from "axios";
import BlindDateView from "./BilndDateView";
import { getCookieValue } from "../../Api/loginApi";

const BlindDateContainer = () => {
  // 좋아요 누르기
  const buttonLike = async (targetUserId) => {
    const userId = getCookieValue("userId");

    await axios
      .post("http://localhost:8080/blindDate/like", {
        userId: userId,
        targetUserId: targetUserId,
      })
      .then(() => {
        console.log(userId + "가 " + targetUserId + "에게 두근을 보냈습니다");
      });
  };

  // 하루에 한 번씩 변경
  // 시간 설정을 아직 안함
  const getUserData = async () => {
    const userId = getCookieValue("userId");
    const sessionId = getCookieValue("sessionId");
    const response = await axios.get(
      `http://localhost:8080/blindDate/${userId}/matches`,
      {
        headers: { sessionId: sessionId },
      }
    );

    return response.data;
  };

  return <BlindDateView getUserData={getUserData} buttonLike={buttonLike} />;
};

export default BlindDateContainer;
