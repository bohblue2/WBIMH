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
          <h1 className="title">Welcome, partner</h1>
          <p className="paragraph">Let’s make informed choices together!</p>
        </div>
      </div>

      <div className="apps-wrapper">
        <h2 className="categories-title">Trending Queries</h2>
        <div className="categories-grid">
          <CategoryCard
            iconUrl={require('../../assets/icons/calender.svg')}
            title="Apple, Intel 실적 발표"
            description="11월 1일 오전 6시에 Apple과 Intel의 실적 발표가 예정돼 있어요. 이번 실적 발표가 주가에 어떤 영향을 줄까요?"
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/plane.svg')}
            title="중국 관광객 감소"
            description="Eros in cursus turpis massa morbi tristique senectus etole netus et conserter"
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/search.svg')}
            title="한국의 방산주"
            description="Eros in cursus turpis massa morbi tristique senectus etole netus et conserter"
            onExploreClick={onExploreClick}
          />
          <CategoryCard
            iconUrl={require('../../assets/icons/bank.svg')}
            title="미국의 금리 인하"
            description="Tristique senectus et netus et malesuada fames turpis egestas consetuter"
            onExploreClick={onExploreClick}
          />
        </div>
      </div>

      <PromptInput />
    </div>
  );
}

export default Home;