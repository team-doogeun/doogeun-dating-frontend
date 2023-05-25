import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import GirlImage1 from "../../../Img/girl1.png";
import GirlImage2 from "../../../Img/girl.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // This is required for carousel styling

const BlindDateView = ({ getUserData, buttonLike }) => {
  const [userData, setUserData] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSecondCardFlipped, setIsSecondCardFlipped] = useState(false);
  const [userImage1, setUserImage1] = useState([]);
  const [userImage2, setUserImage2] = useState([]);

  useEffect(() => {
    // userData 세팅
    const UserDataFetch = async () => {
      try {
        const Data = await getUserData();

        if (Data) {
          setUserData(Data);
          console.log("유저 데이터 저장 성공");

          let userImage1 = [
            Data.basicFilePath,
            Data.secondFilePath,
            Data.thirdFilePath,
          ];
          // 기본 사진 있으면 -> 사진 데이터 저장 o
          if (userImage1[0]) setUserImage1([...userImage1]);
          else console.log("user1 사진 없음");

          let userImage2 = [
            Data.basicFilePathSec,
            Data.secondFilePathSec,
            Data.thirdFilePathSec,
          ];
          if (userImage2[0]) setUserImage2([...userImage2]);
          else console.log("user2 사진 없음");
        } else {
          console.log("유저 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.log("유저 데이터 받기 실패", error);
      }
    };

    UserDataFetch();
  }, [getUserData]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSecondCardClick = () => {
    setIsSecondCardFlipped(!isSecondCardFlipped);
  };

  return (
    <BlindDateWrapper>
      <WriteContainer>
        <BlindDateTitle>오늘의 두근</BlindDateTitle>
        <BlindDateExplain>
          매일 새벽 두시, 새로운 상대방이 소개 됩니다.
          <br />
          <br /> 카드를 뒤집어서 상대방의 프로필을 확인하고
          <br /> 마음에 드는 상대방을 만났을 때는 주저하지 말고
          <br /> 두근! 시그널을 보내보세요. <br />
          <br />
          서로가 두근 시그널을 보냈을 때 <br />
          서로의 카카오톡 아이디가 공유됩니다.
        </BlindDateExplain>
      </WriteContainer>
      <CardContainer>
        <Card onClick={handleClick}>
          {userData && (
            <CardInner isFlipped={isFlipped}>
              <CardFront>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  interval={5000}
                >
                  {userImage1.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`carousel-img-${index}`} />
                    </div>
                  ))}
                </Carousel>
                <NameContainer>{`${userData.userId},`}</NameContainer>
                <AgeContainer>{userData.age}</AgeContainer>
                <TagContainer>
                  <Tag>{userData.addressType}</Tag>
                  <Tag>{userData.departmentType}</Tag>
                </TagContainer>
              </CardFront>
              <CardBack>
                <InformationContainer>
                  <DeptData>
                    {`${userData.departmentTypeSec} - ${userData.studentId}`}
                  </DeptData>
                  <Name>{userData.userId}</Name>
                  <DeptData>{`키 : ${userData.height}`}</DeptData>
                  <DeptData>{`체형 : ${userData.bodyType}`}</DeptData>
                  <DeptData>{`성격 1 : ${userData.characterType}`}</DeptData>
                  <DeptData>{`성격 2 : ${userData.emotionType}`}</DeptData>
                  <DeptData>{`취미 1 : ${userData.firstHobby}`}</DeptData>
                  <DeptData>{`취미 2 : ${userData.secondHobby}`}</DeptData>
                  <DeptData>{`MBTI : ${userData.mbtiType}`}</DeptData>
                </InformationContainer>
              </CardBack>
            </CardInner>
          )}
        </Card>
        <Button onClick={() => buttonLike(userData.userId)}>두근</Button>
      </CardContainer>
      <CardContainer>
        <Card onClick={handleSecondCardClick}>
          {userData && (
            <CardInner isFlipped={isSecondCardFlipped}>
              <CardFront>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  interval={5000}
                >
                  {userImage2.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`carousel-img-${index}`} />
                    </div>
                  ))}
                </Carousel>
                <NameContainer>{`${userData.userIdSec},`}</NameContainer>
                <AgeContainer>{userData.ageSec}</AgeContainer>
                <TagContainer>
                  <Tag>{userData.addressTypeSec}</Tag>
                  <Tag>{userData.departmentTypeSec}</Tag>
                </TagContainer>
              </CardFront>
              <CardBack>
                <InformationContainer>
                  <DeptData>
                    {`${userData.departmentTypeSec} - ${userData.studentIdSec}`}
                  </DeptData>
                  <Name>{userData.userIdSec}</Name>
                  <DeptData>{`키 : ${userData.heightSec}`}</DeptData>
                  <DeptData>{`체형 : ${userData.bodyTypeSec}`}</DeptData>
                  <DeptData>{`성격 1 : ${userData.characterTypeSec}`}</DeptData>
                  <DeptData>{`성격 2 : ${userData.emotionTypeSec}`}</DeptData>
                  <DeptData>{`취미 1 : ${userData.firstHobbySec}`}</DeptData>
                  <DeptData>{`취미 2 : ${userData.secondHobbySec}`}</DeptData>
                  <DeptData>{`MBTI : ${userData.mbtiTypeSec}`}</DeptData>
                </InformationContainer>
              </CardBack>
            </CardInner>
          )}
        </Card>
        <Button onClick={() => buttonLike(userData.userIdSec)}>두근</Button>
      </CardContainer>
    </BlindDateWrapper>
  );
};

const BlindDateWrapper = styled.div`
  min-height: 100vh;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
`;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 220px;
`;

const BlindDateTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
`;

const BlindDateExplain = styled.p`
  font-size: 1.1rem;
  margin-top: 25px;
  font-weight: 700;
  color: #717171;
`;
const Card = styled.div`
  margin-top: 180px;
  width: 300px;
  height: 420px;
  perspective: 1500px; // 3D 효과를 더 강화하기 위해 perspective 값을 늘립니다.
  transition: transform 0.5s;
  transform-style: preserve-3d;
  border-radius: 30px;

  img {
    width: 300px;
    height: 420px;
    border-radius: 20px;
    object-fit: cover;
  }
  &:hover {
    transform: scale(
      1.05
    ); // hover시 카드가 약간 확대되는 효과를 위해 transform을 추가합니다.
  }
`;

const AgeContainer = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  position: absolute;
  bottom: 63px;
  margin-left: 10px;
  color: white;
  z-index: 3;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;

  ${({ isFlipped }) =>
    isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden; // Add this line
`;

const CardFront = styled(CardFace)`
  padding-bottom: 20px;
  background-color: #f2f2f2;
  color: black;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  img {
    position: relative;
    z-index: 1;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 80%);
    z-index: 2;
  }
  overflow: hidden; // Add this line
`;

const CardBack = styled(CardFace)`
  background-color: #f5f5f5;
  color: #252525;
  transform: rotateY(180deg);
  overflow: hidden; // Add this line
`;

const NameContainer = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
  position: absolute;
  bottom: 60px;
  left: 20px;
  color: white;
  z-index: 3;
`;

const TagContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 3;
`;

const Tag = styled.div`
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: #747474; // or any color you want
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
`;

const InformationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DeptData = styled.p`
  font-weight: 500;
  margin: 10px;
  text-align: center;
`;

const Name = styled.h1`
  text-align: center;
  font-weight: 700;
`;

const Button = styled.button`
  background-color: #747474;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: #565656;
    animation: heartbeat 0.5s infinite;
  }
`;

export default BlindDateView;
