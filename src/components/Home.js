import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import SendIcon from '../assets/icons/send.svg';
import ArrowIcon from '../assets/icons/arrow.svg';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    navigate('/chat', { state: { question: inputValue } });
  };

  // 새로운 함수: explore-link 클릭 시 입력값 설정
  const onExploreClick = (description, title) => {
    navigate('/chat', { state: { question: description, title: title } }); // title 추가
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
        <h2 className="categories-title">Top categories</h2>
        <div className="categories-grid">
          <CategoryCard
            iconUrl={require('../assets/icons/calender.svg')}
            title="Apple, Intel 실적 발표"
            description="11월 1일 오전 6시에 Apple과 Intel의 실적 발표가 예정돼 있어요. 이번 실적 발표가 주가에 어떤 영향을 줄까요?"
            onExploreClick={onExploreClick} // 클릭 핸들러 전달
          />
          <CategoryCard
            iconUrl={require('../assets/icons/plane.svg')}
            title="중국 관광객 감소"
            description="Eros in cursus turpis massa morbi tristique senectus etole netus et conserter"
            onExploreClick={onExploreClick} // 클릭 핸들러 전달
          />
          <CategoryCard
            iconUrl={require('../assets/icons/search.svg')}
            title="한국의 방산주"
            description="Eros in cursus turpis massa morbi tristique senectus etole netus et conserter"
            onExploreClick={onExploreClick} // 클릭 핸들러 전달
          />
          <CategoryCard
            iconUrl={require('../assets/icons/bank.svg')}
            title="미국의 금리 인하"
            description="Tristique senectus et netus et malesuada fames turpis egestas consetuter"
            onExploreClick={onExploreClick} // 클릭 핸들러 전달
          />
        </div>
      </div>

      <div className="prompt-box-bottom">
        <input
          type="text"
          placeholder="How can I help you?"
          value={inputValue}
          onChange={handleInputChange}
          className="prompt-input"
        />
        <button className="primary-button" onClick={handleSubmit}>
          <img src={SendIcon} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
}

// CategoryCard Component
const CategoryCard = ({ iconUrl, title, description, onExploreClick }) => (
    <div className="category-card" onClick={() => onExploreClick(description, title)}> {/* 클릭 시 onExploreClick 호출 */}
      <img src={iconUrl} alt="" className="category-icon" />
      <h3 className="category-name">{title}</h3>
      <p className="category-description">{description}</p>
      <div className="explore-link">
        <span>Explore</span>
        <img src={ArrowIcon} alt="arrow" className="arrow-icon" />
      </div>
    </div>
);

export default Home;