import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from './components/views/NavBar/NavBar';
import PostList from './components/Board/PostList';

function App() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
