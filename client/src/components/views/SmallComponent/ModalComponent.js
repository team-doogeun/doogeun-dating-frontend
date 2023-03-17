import React from "react";
import { useState } from "react";
import "./ModalComponent.css";
import SignIn from "../SignInPage/SignIn";
import NextPopupModal from "./NextPopupModal/NextPopupModal";
import HobbyPopupModal from "./hobby/HobbyPopupModal";

const ModalComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    // 모달창 열면 스크롤 안보임
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    // 모달창 닫으면 스크롤 보임
    document.body.style.overflow = "unset";
  };

  // ***
  // 임시로 props contentName 지정
  // 나중에 변경해줘야함
  // ***
  return (
    <React.Fragment>
      <div className={props.contentName === "다음" ? "nextButton" : ""}>
        <button
          className={props.contentName === "다음" ? "footerButton" : ""}
          onClick={openModal}
        >
          {props.contentName}
        </button>
      </div>
      <ModalContent
        open={modalOpen}
        close={closeModal}
        header={props.header}
        mainContent={props.mainContent}
        nextPage={props.nextPage}
      ></ModalContent>
    </React.Fragment>
  );
};

const ModalContent = (props) => {
  const { open, close, header, mainContent, nextPage } = props;

  const [visible, setVisible] = useState(false);

  // 이거 왜 있는거임?
  const chooseMainContent = (x) => {
    switch (x) {
      case "Login":
        return "login";
      case "Hobby":
        return "hobby";
      case "NextPage":
        return "nextpage";
      default:
        return "";
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className={mainContent}>
          <header>
            {header}
            <button className="close" onClick={close}>
              {/* 우측 상단의 x를 표시 */}
              &times;
            </button>
          </header>
          <main>
            {
              {
                Login: <SignIn />,
                Hobby: <HobbyPopupModal />,
                NextPage: <NextPopupModal />,
              }[mainContent]
            }
          </main>
          <footer className="footerContainer">
            {mainContent === "NextPage" ? (
              <a href={`/${nextPage}`}>
                <button className="yesButton">
                  <span className="text">예</span>
                </button>
              </a>
            ) : null}

            <button
              className={mainContent === "NextPage" ? "noButton" : "close"}
              onClick={close}
            >
              {mainContent === "NextPage" ? (
                <span>아니오</span>
              ) : (
                <span>close</span>
              )}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalComponent;
