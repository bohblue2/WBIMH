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

  const [recommendedQuestions, setRecommendedQuestions] = React.useState([]);

  React.useEffect(() => {
    const fetchRecommendedQuestions = async () => {
      try {
        const response = await fetch('http://localhost:8080/recommendation/asks?k=4');
        const data = await response.json();
        setRecommendedQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching recommended questions:', error);
      }
    };

    fetchRecommendedQuestions();
  }, []);

  const renderRecommendedQuestions = () => {
    return recommendedQuestions.map((question) => (
      <CategoryCard
        key={question.id}
        iconUrl={require('../../assets/icons/calender.svg')}
        title={question.title}
        description={question.content}
        onExploreClick={onExploreClick}
      />
    ));
  };

  let recommendedQuestionsContent = renderRecommendedQuestions()
  
  return (
    <div className="home">
      <div className="prompt-box">
        <div className="top-part">
          <h1 className="title">환영합니다, 당신은 사랑받기 위해 태어났습니다.</h1>
          <p className="paragraph">온라인</p>
        </div>
      </div>

      <div className="apps-wrapper">
        <h2 className="categories-title">자주하는 질문</h2>
        <div className="categories-grid">
          {recommendedQuestionsContent}
        </div>
      </div>

      <PromptInput />
    </div>
  );
}

export default Home;