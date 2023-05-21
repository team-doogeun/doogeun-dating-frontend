import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll";
import { FaArrowCircleUp } from "react-icons/fa";
import Lee from "../../../Img/lee.png";
import Namgung from "../../../Img/Namgung.png";
import Seol from "../../../Img/seol.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Red from "../../../Img/Rectangle 2.png";
import Purple from "../../../Img/Rectangle 2.png";
import Orange from "../../../Img/Rectangle 2.png";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkCookieExistence } from "../../Api/loginApi";

const GlobalStyle = createGlobalStyle`

  .carousel .control-dots .dot {
    background: #f5f5f5;
    box-shadow: none;
    width: 13px;
    height: 13px;
    margin-bottom: 20px;
  }

  .carousel .control-dots .dot.selected {
    background: #fff;
    box-shadow: none;
  }
`;

const LeftToRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const RightToLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HomePage = () => {
  const navigator = useNavigate();
  const [visible, setVisible] = useState(false);
  const [animateSectionOne, setAnimateSectionOne] = useState(false);
  const [animateSectionTwo, setAnimateSectionTwo] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    const sectionOne = document.getElementById("section1");
    if (sectionOne) {
      const sectionTop = sectionOne.getBoundingClientRect().top;
      const sectionBottom = sectionOne.getBoundingClientRect().bottom;
      const sectionHeight = sectionOne.offsetHeight;

      if (
        sectionTop <= window.innerHeight - sectionHeight * 0.1 &&
        sectionBottom >= sectionHeight * 0.1
      ) {
        setAnimateSectionOne(true);
      } else {
        setAnimateSectionOne(false);
      }
    }

    const sectionTwo = document.getElementById("section2");
    if (sectionTwo) {
      const sectionTop = sectionTwo.getBoundingClientRect().top;
      const sectionBottom = sectionTwo.getBoundingClientRect().bottom;
      const sectionHeight = sectionTwo.offsetHeight;

      if (
        sectionTop <= window.innerHeight - sectionHeight * 0.1 &&
        sectionBottom >= sectionHeight * 0.1
      ) {
        setAnimateSectionTwo(true);
      } else {
        setAnimateSectionTwo(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  useEffect(() => {
    const sectionOne = document.getElementById("section1");
    const sectionTwo = document.getElementById("section2");

    const handleIntersection = (entries, observer) => {
      const [entry] = entries;
      if (entry.target.id === "section1") {
        if (entry.isIntersecting) {
          sectionOne.classList.add("animate");
          observer.unobserve(sectionOne);
          observer.observe(sectionTwo);
        } else {
          sectionOne.classList.remove("animate");
        }
      } else if (entry.target.id === "section2") {
        if (entry.isIntersecting) {
          sectionTwo.classList.add("animate");
        } else {
          sectionTwo.classList.remove("animate");
        }
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Adjusted threshold value
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionOne) {
      observer.observe(sectionOne);
    }

    if (sectionTwo) {
      observer.observe(sectionTwo);
    }

    return () => {
      if (sectionOne) {
        observer.unobserve(sectionOne);
      }
      if (sectionTwo) {
        observer.unobserve(sectionTwo);
      }
    };
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
          interval={5000}
        >
          <Banner>
            <ButtonContainer>
              <TextContainer>
                <h2>두근할래?</h2>
                <h4>대학교 만남은 두근에서!</h4>
              </TextContainer>
              <Link to="#" onClick={() => scrollToSection("section1")}>
                <BlindDateButton>소개팅</BlindDateButton>
              </Link>
              <Link to="#" onClick={() => scrollToSection("section2")}>
                <MeetingButton>미팅</MeetingButton>
              </Link>
            </ButtonContainer>
            <img src={Red} alt="Banner 1" title="두근에서" />
          </Banner>
          <Banner>
            <ButtonContainer>
              <Link to="#" onClick={() => scrollToSection("section1")}>
                <BlindDateButton>소개팅</BlindDateButton>
              </Link>
              <Link to="#" onClick={() => scrollToSection("section2")}>
                <MeetingButton>미팅</MeetingButton>
              </Link>
            </ButtonContainer>
            <img src={Purple} alt="Banner 2" />
          </Banner>
          <Banner>
            <ButtonContainer>
              <Link to="#" onClick={() => scrollToSection("section1")}>
                <BlindDateButton>소개팅</BlindDateButton>
              </Link>
              <Link to="#" onClick={() => scrollToSection("section2")}>
                <MeetingButton>미팅</MeetingButton>
              </Link>
            </ButtonContainer>
            <img src={Orange} alt="Banner 3" />
          </Banner>
        </Carousel>
      </Section>
      <SectionContainer>
        <SectionOne
          id="section1"
          className={animateSectionOne ? "animate" : ""}
        >
          <SectionOneLeftContainer>
            <h2 className={animateSectionOne ? "animate" : ""}>
              1대 1로 매칭되는 두근 서비스!
              <br />
              <br />
              간편한 방식으로 상대방과 두근을 느껴보세요.
              <br />
              가장 어울리는 이상형을 소개해드립니다.
            </h2>
            <GoToBlindDate
              onClick={() => {
                navigator("/blindDate");
              }}
            >
              소개팅
            </GoToBlindDate>
          </SectionOneLeftContainer>
          <SectionOneRightContainer></SectionOneRightContainer>
        </SectionOne>
        <SectionTwo
          id="section2"
          className={animateSectionTwo ? "animate" : ""}
        >
          <h2 className={animateSectionTwo ? "animate" : ""}>
            다함께 두근 서비스!
            <br />
            <br />
            간편한 방식으로 상대방과 두근을 느껴보세요.
            <br />
            가장 어울리는 이상형을 소개해드립니다.
          </h2>
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
      </SectionContainer>

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
  height: calc(90vh - 100px);
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 1200px;
    height: 1200px;
    object-fit: cover;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 17%;
  left: 30%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  max-width: 1040px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  animation: ${LeftToRight} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 1.8rem;
    color: #252525;
    opacity: 0;

    &.animate {
      opacity: 1;
    }
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
  min-height: 100vh;
  max-width: 1040px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${RightToLeft} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 1.8rem;
    color: #252525;
    opacity: 0;
    text-align: right;
    &.animate {
      opacity: 1;
    }
  }

  p {
    color: #252525;
  }

  img {
    width: 500px;
    height: 500px;
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

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #252525;
    margin-bottom: 30px;
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
  max-width: 1000px;
`;

const TeamCard = styled.div`
  flex: 1;
  margin: 1.3rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

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
  height: 250px;

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

const SectionOneLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionOneRightContainer = styled.div`
  display: flex;
`;

const BlindDateButton = styled.span`
  border: none;
  background-color: #fff;
  width: 170px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1rem;
  background-color: #fff;
  color: #ff493e;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
`;

const MeetingButton = styled.span`
  border: none;
  background-color: #fff;
  width: 170px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1rem;
  background-color: #fff;
  color: #ff493e;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
`;

const GoToBlindDate = styled.button`
  border: none;
  width: 200px;
  height: 60px;
  border-radius: 13px;
  background-color: #ff2559;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const SectionContainer = styled.div`
  max-width: 1040px;
`;

const TextContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
  transform: translateX(-25%);
  transform: translateY(-300%);
  h2 {
    align-items: center;
    justify-content: center;
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 4rem;
    color: #fff;
    text-align: center;
    border: none;
    border-radius: 10px;
    z-index: 2;
  }

  h4 {
    text-align: left;
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    color: #fff;
  }
`;

export default HomePage;
