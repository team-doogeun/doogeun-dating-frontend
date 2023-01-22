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
        <FooterDescRihts>DuGeun Progect Deserved RIGHTS.</FooterDescRihts>
      </FooterDescContainer>
    </FooterBox>
  );
}
const FooterBox = styled.div`
  background-color: white;
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
    padding-bottom: 20px;
  }
`;

const FooterContent = styled.p`
  color: gray;
  font-size: 14px;
  line-height: 40px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const FooterSpace = styled.div`
  width: 100px;
`;

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

const FooterDescContainer = styled.div`
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const FooterDescRihts = styled.h2`
  color: gray;
  font-size: 20px;
  text-align: center;
`;

export default Footer;
