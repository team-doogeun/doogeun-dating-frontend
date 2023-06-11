import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import MypageSidemenuContainer from '../../MyPageSidemenu/MyPageSidemenuContainer';
import { getJWTCookie } from '../../../../Api/loginApi';

const UserBlindDateMeetingView = () => {
  const [resUserData, setResUserData] = useState([]);
  const [componentToRender, setComponentToRender] = useState(null);
  const [blindDateORMeet, setBlindDateORMeet] = useState('meeting');

  const userId = getJWTCookie('userId');
  const authToken = getJWTCookie('jwtAccessToken');

  // 내가 호감 보낸 사람
  const getBlindDateToLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/toLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('내가 호감표시한 유저들 에러 :', err);
      });

    return response;
  };

  // 내게 호감 보낸 사람
  const getBlindDatefromLike = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/blindDate/fromLike`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('내게 호감표시한 유저들 에러 :', err);
      });

    return response;
  };

  // 최종매치 유저
  const getBlindDateMatches = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/${userId}/finalMatches`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('매칭 유저들 에러 :', err);
      });

    return response;
  };

  const getMeetingHost = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/my-rooms`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('내가 호감표시한 유저들 에러 :', err);
      });

    return response;
  };

  const getMeetingRegister = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/entering`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('내게 호감표시한 유저들 에러 :', err);
      });

    return response;
  };

  const getMeetingHostStart = async () => {
    const response = await axios
      .get(`http://localhost:8080/mypage/group/${userId}/achieve`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('매칭 유저들 에러 :', err);
      });

    return response;
  };

  const blindDateCategory = (resUserData, detailCategory) => {
    switch (detailCategory) {
      case 'toLike':
        setComponentToRender(<UserToLike toLike={resUserData} />);
        break;
      case 'fromLike':
        setComponentToRender(<UserFromLike fromLike={resUserData} />);
        break;
      case 'matches':
        setComponentToRender(<UserMatches matches={resUserData} />);
        break;
      case 'my-rooms':
        setComponentToRender(<UserHost host={resUserData} />);
        break;
      case 'entering':
        setComponentToRender(<UserRegister register={resUserData} />);
        break;
      case 'achieve':
        setComponentToRender(<UserHostStart hostStart={resUserData} />);
        break;
      default:
        setComponentToRender(<></>);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUrl = window.location.href;
      const splitUrl = currentUrl.split('/');
      const category = splitUrl[splitUrl.length - 2];
      const detailCategory = splitUrl.pop();

      setBlindDateORMeet(category);

      if (detailCategory === 'toLike') {
        const userData = await getBlindDateToLike();
        setResUserData(userData);
      } else if (detailCategory === 'fromLike') {
        const userData = await getBlindDatefromLike();
        setResUserData(userData);
      } else if (detailCategory === 'Matches') {
        const userData = await getBlindDateMatches();
        setResUserData(userData);
      }
      // 아래는 미팅파트 / 수정필요함
      else if (detailCategory === 'my-rooms') {
        const userData = await getMeetingHost();
        setResUserData(userData);
      } else if (detailCategory === 'entering') {
        const userData = await getMeetingRegister();
        setResUserData(userData);
      } else if (detailCategory === 'achieve') {
        const userData = await getMeetingHostStart();
        setResUserData(userData);
      }

      blindDateCategory(resUserData, detailCategory);
    };

    fetchData();
  }, []);

  return (
    <>
      <UserSettingLayout>
        <UserSettingContainer>
          {blindDateORMeet && blindDateORMeet === 'blindDate' ? (
            <>
              <MypageSidemenuContainer currentMenu="MyBlindDate" />
              <UserSettingWrapper>
                <UserInfoTitle>내 소개팅</UserInfoTitle>
                <UserInfoBox>{componentToRender}</UserInfoBox>
              </UserSettingWrapper>
            </>
          ) : (
            <>
              <MypageSidemenuContainer currentMenu="MyMeeting" />
              <UserSettingWrapper>
                <UserInfoTitle>내 미팅</UserInfoTitle>
                <UserInfoBox>{componentToRender}</UserInfoBox>
              </UserSettingWrapper>
            </>
          )}
        </UserSettingContainer>
      </UserSettingLayout>
    </>
  );
};

const UserToLike = ({ toLike }) => {
  return (
    <>
      <UserCommonHeader>내가 호감표시한 상대</UserCommonHeader>
      <UserDataWrapper>
        {toLike.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoTitle>{`아이디 : ${item.userId}`}</UserInfoTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserFromLike = ({ fromLike }) => {
  const userId = getJWTCookie('userId');
  const authToken = getJWTCookie('jwtAccessToken');

  const buttonLike = async (targetUserId) => {
    await axios
      .post(
        `http://localhost:8080/mypage/blindDate/fromLike/like`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(`${userId} -> ${targetUserId}`);
        return res;
      })
      .catch((err) => {
        console.log('내게 호감표시한 유저들 에러 :', err);
      });
  };
  return (
    <>
      <UserCommonHeader>내게 호감표시한 상대</UserCommonHeader>
      <UserDataWrapper>
        {fromLike.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoTitle>{`아이디 : ${item.userId}`}</UserInfoTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
            <LikeButton onClick={() => buttonLike(item.userId)}>
              두근 보내기
            </LikeButton>
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserMatches = ({ matches }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [kakaoId, setKakaoId] = useState(null);
  const userId = getJWTCookie('userId');
  const authToken = getJWTCookie('jwtAccessToken');

  const getKakaoId = async (targetUserId) => {
    await axios
      .get(
        `http://localhost:8080/mypage/blindDate/finalMatches/getExternalId`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const resData = res.data;
        setKakaoId(resData);
      })
      .catch((err) => {
        console.log('매칭된 유저 못 찾음 : ', err);
      });
  };

  return (
    <>
      <UserCommonHeader>매칭된 유저</UserCommonHeader>
      <UserDataWrapper>
        {matches.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoTitle>{`아이디 : ${item.userId}`}</UserInfoTitle>
            <UserInfo>{`나이 : ${item.age}`}</UserInfo>
            <UserInfo>{`대학 : ${item.department}`}</UserInfo>
            <TargetUserCheckButton
              onClick={() => {
                getKakaoId(item.userId);
                setModalOpen(!modalOpen);
              }}
            >
              상대 유저 카톡확인
            </TargetUserCheckButton>
            {modalOpen && (
              <>
                <KakaoIdBox>{`카카오 아이디 : ${kakaoId}`}</KakaoIdBox>
              </>
            )}
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
    </>
  );
};

const UserHost = ({ host }) => {
  return (
    <>
      <UserCommonHeader>내가 만든 미팅방</UserCommonHeader>
      <UserDataWrapper>
        {host.map((item, idx) => (
          <UserInfoGrid key={idx}>
            <UserInfoTitle>{`방 제목 : ${item.title}`}</UserInfoTitle>
            <UserInfo>{`${item.capacityMale} ${item.capacityFemale}`}</UserInfo>
            <UserInfo>{`현재 인원 : 남 ${item.presentMale} 여 ${item.presentFemale}`}</UserInfo>
          </UserInfoGrid>
        ))}
      </UserDataWrapper>
      ;
    </>
  );
};

const UserRegister = ({ register }) => {
  return <UserCommonHeader>내가 입장한 미팅방 </UserCommonHeader>;
};

const UserHostStart = ({ hostStart }) => {
  return <UserCommonHeader>시작한 미팅방</UserCommonHeader>;
};

const commonTextStyle = {
  width: '250px',
  height: '20px',
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#5c5c5c',
};

const UserSettingLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  top: 150px;
  margin-top: 100px;
`;

const UserSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserSettingWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 700px;
  width: 800px;
  max-width: 1100px;
  flex-direction: column;
  justify-content: left;
  margin-top: 80px;
`;

const UserInfoTitle = styled.div`
  position: relative;
  width: 110px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  text-align: center;

  color: #000000;
`;

const UserInfoBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 760px;
  min-height: 250px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 16px;
`;

const UserInfoGrid = styled.div`
  width: 180px;
  min-height: 150px;
  max-height: 150px;
  font-size: 24px;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
`;

const UserInfo = styled.div`
  padding-left: 20px;
  font-size: 16px;
`;

const UserCommonHeader = styled.div`
  position: relative;
  width: 760px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  margin-top: 15px;
  text-align: center;

  color: #000000;
`;

const UserDataWrapper = styled.div`
  width: 760px;
  min-height: 200px;
  max-height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const LikeButton = styled.button`
  width: 150px;
  height: 30px;
  background-color: #ff4572;
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

const TargetUserCheckButton = styled.button`
  width: 150px;
  height: 30px;
  background-color: #ff4572;
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

const KakaoIdBox = styled.div`
  ${commonTextStyle}
`;

export default UserBlindDateMeetingView;
