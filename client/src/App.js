import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from './components/views/NavBar/NavBar';
import PostList from './components/Board/PostList';

// 작업하는 페이지 가져오기
import SignUpPage from './components/views/SignUpPage/SignUpPage';
import Footer from './components/views/Footer/Footer';
import HobbyButton from './components/views/SmallComponent/HobbyButton';
import HobbyModal from './components/views/SmallComponent/HobbyModal';

function App() {
  return (
    <div className="superContainer">
      {/* <NavBar />
      <div id="wrapper">
        
      </div>
      <Footer /> */}
      {/* <SignUpPage /> */}
      <HobbyModal />
    </div>
  );
}

export default App;
