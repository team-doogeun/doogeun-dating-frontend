import React from 'react';
import { useState } from 'react';
import './ModalComponent.css';
import SignIn from '../SignInPage/SignIn';
import HobbyButton from './hobby/HobbyButton';

const ModalComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    // 모달창 열면 스크롤 안보이게
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    // 모달창 닫으면 다시 셋
    document.body.style.overflow = 'unset';
  };

  return (
    <React.Fragment>
      <button className="buttons" onClick={openModal}>
        {props.contentName}
      </button>
      <ModalContent
        open={modalOpen}
        close={closeModal}
        header={props.contentName}
        mainContent={props.mainContent}
      ></ModalContent>
    </React.Fragment>
  );
};

const ModalContent = (props) => {
  const { open, close, header, mainContent } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {/* 우측 상단의 x를 표시 */}
              &times;
            </button>
          </header>
          <main className={mainContent === 'Login' ? 'login' : 'hobby'}>
            {
              {
                Login: <SignIn />,
                Hobby: <HobbyButton />,
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
