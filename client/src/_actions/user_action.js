import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from './types';

// dataToSubmit 부분에는 보내고자 하는 data가 들어간다
// SignIn.js 에서 선언된 body부분이다.
export const loginUser = async (dataToSubmit) => {
  const request = await axios
    .post('/', dataToSubmit)
    .then((response) => {
      // code 200이면 성공
      // 대신 얘는 로그인한 닉네임으로 홈페이지 접속
      if (response.data === 200) {
        window.open('http://localhost:3000', '__self');
        // dispatch({ type: LOGIN_USER, payload: response.data });
      }
    })
    .catch((e) => {
      // 아무 닉네임 없는 상태로 홈페이지 접속
      window.open('http://localhost:3000', '__self');
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
};
