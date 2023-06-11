import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getJWTCookie } from '../../../../Api/loginApi';
import UserBlindDateMeetingView from './UserBlindDateMeetingView';

const UserBlindDateMeetingContainer = () => {
  return <UserBlindDateMeetingView />;
};
export default UserBlindDateMeetingContainer;
