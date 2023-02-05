import { LOGIN_USER } from '../_actions/types';

const User = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    default:
      return state;
  }
};

export default User;
