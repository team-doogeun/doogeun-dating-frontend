import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterBox>
      <FooterContainer>
        <FooterSlogan>" 대학생만이 누릴 수 있는 안전한 만남 "</FooterSlogan>
        <FooterSpace />
        <FooterContent>
          이메일 : Dugeun112@gmail.com
          <br />
          사업자 번호 : 010-3123-1123
          <br />
          주소 : 서울특별시 광진구 능동로 120
          <br />
        </FooterContent>
      </FooterContainer>
      <FooterDescContainer>
        <FooterDescRihts>DuGeun Project Deserved RIGHTS.</FooterDescRihts>
      </FooterDescContainer>
    </FooterBox>
  );
}

// Footer 구조
const FooterBox = styled.div`
  background-color: #f8f8f8;
  color: #8f8f8f !important;
  font-family: 'NanumSquareR', sans-serif;
  scroll-behavior: smooth;
  width: 100%;
  border-top: 1px solid rgb(25, 25, 25);
  position: relative;
  z-index: 100;
  padding: 20px 20px 0;
`;

const FooterContainer = styled.div`
  display: block;
  box-sizing: border-box;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 10px 200px;
  }
`;

// 기본적인 내용
const FooterContent = styled.p`
  color: gray;
  font-size: 14px;
  line-height: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

// 사이에 빈공간
const FooterSpace = styled.div`
  width: 100px;
`;

// 슬로건
const FooterSlogan = styled.div`
  color: gray;
  font-size: 20px;
  font-weight: bold;
  width: 400px;
  text-decoration: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

// 권리 설명 문구
const FooterDescContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px 0;
  @media (max-width: 768px) {
    padding: 0 0 10px 0;
  }
`;

const FooterDescRihts = styled.h2`
  color: gray;
  font-size: 20px;
  text-align: center;
`;

export default Footer;
