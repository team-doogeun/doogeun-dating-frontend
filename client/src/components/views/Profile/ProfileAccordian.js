import { useState, React, useHistory } from "react";
import styled from "styled-components";

const AccordianMenu = () => {
  const MENU_LIST = [
    {
      title: "My 소개팅",
      list: ["내가 두근한 상대", "나를 두근한 상대", "매칭 성공"],
    },
    {
      title: "My 미팅",
      list: ["내가 만든 미팅방", "내가 입장한 미팅방", "시작한 미팅방"],
    },
  ];

  const [activeIndex, setActiveIndex] = useState();

  return (
    <Nav>
      <TitleWrapper>
        <Title>DigiFinance</Title>
      </TitleWrapper>
      <Ul>
        {MENU_LIST.map((item, idx) => {
          const active = idx === activeIndex ? "active" : "";

          return (
            // 1단 메뉴 부분
            // ListItem 하나 하나가 <li>이다
            <ListItem
              title={item.title}
              idx={idx}
              list={item.list}
              active={active}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          );
        })}
      </Ul>
    </Nav>
  );
};

const ListItem = ({
  title,
  list,
  active,
  activeIndex,
  setActiveIndex,
  idx,
}) => {
  const history = useHistory();
  const [clickedIdx, setClickedIdx] = useState();

  // 1단 메뉴 클릭 이벤트 처리 함수
  // 위에서 언급한 1단 메뉴 클릭 시 activeIndex라는 state에 해당 인덱스를 저장해준다
  const handleClick = () => {
    setActiveIndex(idx);
    setClickedIdx(null);
    history.push(`/${title}`);
  };

  // 2단 메뉴 클릭 이벤트 처리 함수
  const handleLink = (e, idx) => {
    setClickedIdx(idx);
    history.push({
      pathname: `/${title}`,
      state: {
        clicked: idx,
      },
    });
  };

  return (
    <Li>
      {/* // 상위 컴포넌트에서 받아온 active 변수를 className으로 넘겨준다 // 이 때
      `active`라는 변수가 활성화되면 이에 대응하는 스타일링을 처리해준다 */}
      <AccodianWrapper className={active}>
        <FirstMenu onClick={handleClick}>
          <IconWrapper>
            <RiDashboardLine />
          </IconWrapper>
          <Menu>{title}</Menu>
        </FirstMenu>
        <SecondMenu className={idx === activeIndex ? "" : "closed"}>
          {list?.map((menu, idx) => (
            <li
              onClick={(e) => handleLink(e, idx)}
              className={clickedIdx === idx ? "strong" : ""}
            >
              {menu}
            </li>
          ))}
        </SecondMenu>
      </AccodianWrapper>
    </Li>
  );
};

const Nav = styled.nav`
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #5c5c5c;
  :hover {
    color: #2e55e7;
  }
`;
const TitleWrapper = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const Title = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;
const Ul = styled.ul`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const Li = styled.li`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const AccodianWrapper = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const FirstMenu = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const Menu = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const SecondMenu = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;
const IconWrapper = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

const RiDashboardLine = styled.div`
  width: 150px;
  height: 23px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;
