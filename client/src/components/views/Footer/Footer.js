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
  max-height: 400px;
  position: relative;
  transform: translateY(-100%);
  scroll-behavior: smooth;
  width: 100%;
  border-top: 1px solid rgb(25, 25, 25);

  margin-bottom: 0;
  padding: 0 20px 0;
`;

const FooterContainer = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 10px 100px;
  }
`;

// 기본적인 내용
const FooterContent = styled.p`
  color: gray;
  font-size: 14px;
  padding-top: 10px;

  line-height: 30px;

  @media (max-width: 768px) {
    margin-top: 10px;
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
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 15px;
  }
`;

// 권리 설명 문구
const FooterDescContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterDescRihts = styled.h2`
  font-size: 20px;
  width: 100%;
  text-align: center;
  color: #8f8f8f;
  padding: 0 0 10px 0;
  @media (max-width: 768px) {
    padding: 0 0 5px 0;
  }
`;

export default Footer;
