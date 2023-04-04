<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./_reducers";
import { createStore } from "redux";
import NavBar from "./components/views/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/views/Footer/Footer";
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './_reducers';
import { createStore } from 'redux';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
>>>>>>> e3ec582b8366aec3c24a025b6e5556958cabea2e

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <NavBar />
      <App />
      <Footer />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
