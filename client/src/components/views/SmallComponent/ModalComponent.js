import React from "react";
import { useState } from "react";
import "./ModalComponent.css";
import SignIn from "../SignInPage/SignIn";
import HobbyButton from "./hobby/HobbyButton";
import NextPopupModal from "./NextPopupModal";

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
        header={props.contentName}
        mainContent={props.mainContent}
        pageName={props.nextPageName}
      ></ModalContent>
    </React.Fragment>
  );
};

const ModalContent = (props) => {
  const { open, close, header, mainContent, pageName } = props;

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
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {/* 우측 상단의 x를 표시 */}
              &times;
            </button>
          </header>
          <main className={chooseMainContent(mainContent)}>
            {
              {
                Login: <SignIn />,
                Hobby: <HobbyButton />,
                NextPage: <NextPopupModal pageName={props.pageName} />,
              }[mainContent]
            }
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalComponent;
