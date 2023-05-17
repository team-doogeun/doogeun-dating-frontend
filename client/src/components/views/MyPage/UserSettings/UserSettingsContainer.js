import React, { useState, useEffect } from "react";
import UserSettingsView from "./UserSettingsView";
import { useNavigate } from "react-router-dom";

const UserSettingContainer = () => {
  const navigate = useNavigate();

  return <UserSettingsView navigate={navigate} />;
};

export default UserSettingContainer;