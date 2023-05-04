import React from "react";
import styled from "styled-components";
import "./Footer.css";

function Footer() {
  return (
    <div className="container my-5">
      <footer className="text-center text-lg-start text-dark">
        <section className="d-flex justify-content-between p-4 text-white">
          <div className="me-5">
            <span>
              {/* Get connected with us on social networks : just call me 010 +
              ((1&lt;&lt;9)**3+(1&lt;&lt;8)**3+(1&lt;&lt;7)**3+(1&lt;&lt;3)**3+3)**3 */}
              Get connected with us on social networks : just call me
              010-3943-8003
            </span>
          </div>

          <div>
            <a href="/" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Project Introduce</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                <p>
                  Here you can use Meeting <br /> || BlindDate content.
                  <br /> Just enjoy your time. <br />
                  Carpe Diem!
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                <p>
                  <a href="/" className="text-dark">
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a href="/" className="text-dark">
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a href="/" className="text-dark">
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a href="/" className="text-dark">
                    Bootstrap Angular
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                <p>
                  <a href="/" className="text-dark">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="/" className="text-dark">
                    just touch me! haha~
                  </a>
                </p>

                <p>
                  <a href="/" className="text-dark">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" />
                <p>
                  <i className="fas fa-home mr-3"></i> 새쳔년관 501호 개발실
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 프론트엔드
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 백엔드1
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 백엔드2
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-3">
          © 2023 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
}

function Footer1() {
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
// color #8f8f8f
const FooterBox = styled.div`
  background-color: mediumaquamarine;
  color: black !important;
  font-weight: bold;
  font-family: "NanumSquareR", sans-serif;
  min-height: 200px;
  position: relative;
  scroll-behavior: smooth;
  width: 100%;
  border-top: 1px solid rgb(25, 25, 25);
  bottom: 0;
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
  color: black;
  font-size: 16px;
  font-weight: bold;
  padding-top: 15px;
  line-height: 40px;

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
  color: black;
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
  color: black;
`;

const FooterDescRihts = styled.h2`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  color: black;
  padding: 0 0 10px 0;
  @media (max-width: 768px) {
    padding: 0 0 5px 0;
  }
`;

export default Footer;
