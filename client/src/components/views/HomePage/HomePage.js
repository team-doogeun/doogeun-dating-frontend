import React from "react";
import { useNavigate } from "react-router-dom";
import { components } from "react-select";
import styled from "styled-components";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="imgContainer">
      <StyledDiv>
        <p className="intro">두근 프로젝트에 오신 것을 환영합니다.</p>
      </StyledDiv>
      <StyledDiv>
        <div className="backImg"></div>
      </StyledDiv>
      <div className="inform">
        <StyledDiv>
          <div>
            <div>저희는 어떤 프로젝트?</div>
            <div>교내 소개팅, 미팅 서비스!</div>
            <div>코로나로 인해 잠깐 주춤했다면!</div>
            <div>저희 서비스를 이용해보는건 어떠신가요!</div>
          </div>
        </StyledDiv>
      </div>
      <div className="explainTeam">
        <div className="front">
          <div>
            <div className="iconImg1"></div>
            <div className="explainWho">
              <div>프론트엔드 개발자</div>
              <div>특기 : 축구</div>
              <div>취미 : 축구</div>
              <div>목표 : 프론트엔드 개발자</div>
            </div>
          </div>
        </div>
        <div className="backend1">
          <div>
            <div className="iconImg2"></div>
            <div className="explainWho">
              <div>백엔드 개발자</div>
              <div>특기 : dddd</div>
              <div>취미 : </div>
              <div>목표 : </div>
            </div>
          </div>
        </div>
        <div className="backend2">
          <div>
            <div className="iconImg3"></div>
            <div className="explainWho">
              <div>백엔드 개발자</div>
              <div>특기 : ddddddddddddddd</div>
              <div>취미 : </div>
              <div>목표 : </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// styled-components는 대문자로 시작해야 적용이 된다
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HomePage;
