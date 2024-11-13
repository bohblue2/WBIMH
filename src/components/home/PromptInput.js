// src/components/HOME/PromptInput.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PromptInput.css';
import SendIcon from '../../assets/icons/send.svg';

const PromptInput = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      navigate('/chat', { state: { question: inputValue } });
      setInputValue(''); // 전송 후 입력 필드 초기화
    }
  };

  // 엔터 키 입력 감지
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(); // 엔터 키 입력 시 handleSubmit 호출
    }
  };

  return (
    <div className="prompt-box-bottom">
      <input
        type="text"
        placeholder="How can I help you?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // 엔터 키 입력 감지 추가
        className="prompt-input"
      />
      <button className="primary-button" onClick={handleSubmit}>
        <img src={SendIcon} alt="Send" className="send-icon" />
      </button>
    </div>
  );
};

export default PromptInput;