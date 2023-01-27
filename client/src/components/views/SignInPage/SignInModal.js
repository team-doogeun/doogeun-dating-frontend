import React from 'react';
import './SignInModal.css';
import SignIn from './SignIn';
import HobbyButton from '../SmallComponent/HobbyButton';

const ModalComponent = (props) => {
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
          <main>
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
