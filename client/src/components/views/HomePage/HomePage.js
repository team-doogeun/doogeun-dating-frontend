import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <About></About>
    </div>
  );
}

// 홈화면 소개 컴포넌트
function About() {}

export default HomePage;
