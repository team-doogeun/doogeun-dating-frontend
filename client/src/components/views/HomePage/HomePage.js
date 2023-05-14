import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll";
import { FaArrowCircleUp } from "react-icons/fa";
import Lee from "../../../Img/lee.png";
import Namgung from "../../../Img/Namgung.png";
import Seol from "../../../Img/seol.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Red from "../../../Img/banner1.png";
import Purple from "../../../Img/banner2.png";
import Orange from "../../../Img/banner3.png";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  .carousel .control-dots .dot {
    background: #f5f5f5;
    box-shadow: none;
    width: 13px;
    height: 13px;
    margin-bottom: 40px;
  }

  .carousel .control-dots .dot.selected {
    background: #fff;
    box-shadow: none;
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Main>
      <Section>
        <GlobalStyle />
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={8000}
        >
          <Banner>
            <ButtonContainer>
              <Link to="section1" smooth={true} duration={300}>
                <Button>단둘이 두근</Button>
              </Link>
              <Link to="section2" smooth={true} duration={300}>
                <Button>다함께 두근</Button>
              </Link>
            </ButtonContainer>
            <img src={Red} alt="Banner 1" title="두근에서" />
          </Banner>
          <Banner>
            <ButtonContainer>
              <Link to="section1" smooth={true} duration={300}>
                <Button>단둘이 두근</Button>
              </Link>
              <Link to="section2" smooth={true} duration={300}>
                <Button>다함께 두근</Button>
              </Link>
            </ButtonContainer>
            <img src={Purple} alt="Banner 2" />
          </Banner>
          <Banner>
            <ButtonContainer>
              <Link to="section1" smooth={true} duration={300}>
                <Button>단둘이 두근</Button>
              </Link>
              <Link to="section2" smooth={true} duration={300}>
                <Button>다함께 두근</Button>
              </Link>
            </ButtonContainer>
            <img src={Orange} alt="Banner 3" />
          </Banner>
        </Carousel>
      </Section>

      <SectionOne id="section1">
        <h2>
          1대 1로 매칭되는 두근 서비스! <br /> 간편한 방식으로 상대방과 두근을
          느껴보세요.
        </h2>

        <img src={Red} />
      </SectionOne>
      <SectionTwo id="section2">
        <h2>다함께 두근</h2>
        <p>설명</p>
      </SectionTwo>
      <SectionThree id="section3">
        <h2>팀원 소개</h2>
        <TeamContainer>
          <TeamCard>
            <ImageContainer>
              <img src={Lee} alt="팀원1 이미지" />
            </ImageContainer>
            <h3>이승민</h3>

            <CardContent>
              <p>백엔드</p>
            </CardContent>
          </TeamCard>
          <TeamCard>
            <ImageContainer>
              <img src={Seol} alt="팀원2 이미지" />
            </ImageContainer>
            <h3>심예설</h3>
            <CardContent>
              <p>백엔드</p>
            </CardContent>
          </TeamCard>
          <TeamCard>
            <ImageContainer>
              <img src={Namgung} alt="팀원3 이미지" />
            </ImageContainer>
            <h3>남궁승</h3>

            <CardContent>
              <p>프론트엔드</p>
            </CardContent>
          </TeamCard>
        </TeamContainer>
      </SectionThree>
      <ScrollToTop>
        <FaArrowCircleUp
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
          size="45"
          color="gray"
        />
      </ScrollToTop>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 530px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  color: #ffffff;
`;

const Banner = styled.div`
  width: 100%;
  height: calc(73vh - 100px);
  background-color: transparent;
  position: relative;

  img {
    width: 1200px; // or any specific value
    height: 900px;
    object-fit: cover; // this will make sure your image always covers the entire container
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  animation: ${fadeIn} 2.5s ease-in;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  display: flex;
  margin: 5rem 0;
  max-width: 65rem;
  flex-direction: column;
`;

const Button = styled.a`
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
  font-size: 1rem;
  background-color: #fff;
  color: #ff2559;
  text-decoration: none;
  text-align: center;
  border: 1px solid #ff426f;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
`;

const Section = styled.section`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #252525;
  }

  p {
    color: #252525;
  }
`;

const SectionOne = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  animation: ${fadeIn} 2.5s ease-in;
  align-items: center;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #252525;
  }

  p {
    color: #252525;
  }

  img {
    width: 500px;
    height: 500px;
  }
`;

const SectionTwo = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #252525;
  }

  p {
    color: #252525;
  }
`;

const SectionThree = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #ff426f;
    margin-bottom: 100px;
  }

  p {
    color: #252525;
  }
`;

const ScrollToTop = styled.div`
  position: fixed;
  width: 100%;
  bottom: 40px;
  align-items: center;
  height: 60px;
  display: flex;
  justify-content: end;
  margin-right: 150px;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const TeamCard = styled.div`
  flex: 1;
  margin: 1rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  animation: ${fadeIn} 1s ease-in;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }

  h3 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    color: #252525;
    font-size: 1.5rem;
    margin-top: 30px;
    text-align: center;
  }

  p {
    color: #252525;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  opacity: 0;
  transition: opacity 0.3s;

  ${TeamCard}:hover & {
    opacity: 1;
  }
`;

export default HomePage;
