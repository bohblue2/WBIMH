// src/components/home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import CategoryCard from './CategoryCard';
import PromptInput from './PromptInput';

function Home() {
  const navigate = useNavigate();

  const onExploreClick = (description, title) => {
    navigate('/chat', { state: { question: description, title: title } });
  };

  return (
    <div className="home">
      <div className="prompt-box">
        <div className="top-part">
          <h1 className="title">환영합니다, 주식 시장에 대해 물어봐주세요.</h1>
          <p className="paragraph">Service Status: Online</p>
        </div>
      </div>

      <div className="apps-wrapper">
        <h2 className="categories-title">Trending Queries</h2>
        <div className="categories-grid">
          <CategoryCard
            iconUrl={require('../../assets/icons/calender.svg')}
            title="코닉오토메이션"
            description="코닉오토메이션에 대해 알려주세요."
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/plane.svg')}
            title="유밥"
            description="유밥 회사가 어떤 대표를 선임했는지 알려주세요."
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/search.svg')}
            title="신성델타테크"
            description="신성델타테크가 상한가 간 이유를 알려주세요."
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/bank.svg')}
            title="CJ올리브네트웍스"
            description="CJ올리브네트웍스의 최근 행보에 대해 알려주세요."
            onExploreClick={onExploreClick}
          />
        </div>
      </div>

      <PromptInput />
    </div>
  );
}

export default Home;