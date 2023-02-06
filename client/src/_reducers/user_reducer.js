import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

const User = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return [...state, action.payload];
      break;
    case REGISTER_USER:
      return [...state, action.payload];
      break;
    case AUTH_USER:
      return [...state, action.payload];
      break;
    default:
      return state;
  }
};

export default User;
