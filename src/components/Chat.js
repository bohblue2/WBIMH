import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Chat.css';
import SendIcon from '../assets/icons/send.svg';
import HomeIcon from '../assets/icons/Home.svg';

const generateResponse = (question) => {
  return `This is a generated response to the question: "${question}"`;
};

function Chat() {
  const location = useLocation(); // 현재 location 가져오기
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(location.state?.question || ''); // 전달된 질문으로 초기화
  const [title, setTitle] = useState(location.state?.title || 'Default Title'); // 제목 추가
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);

  const handleHome = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      sender: 'YOU',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: inputValue,
    };

    const botResponse = {
      sender: 'WBIMH',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: generateResponse(inputValue),
    };

    setMessages(prevMessages => [...prevMessages, userMessage, botResponse]);
    setInputValue('');
  };

  // 스크롤을 자동으로 아래로 이동
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight; // 자동 스크롤
    }
  }, [messages]);

// 입력값이 있을 때 자동으로 제출, 그러나 처음에만 자동으로 할 수 있도록 수정
useEffect(() => {
    if (location.state?.question) {
      handleSubmit(); // 처음에 전달된 질문 자동 제출
    }
    if (location.state?.title) {
      setTitle(location.state.title);
    }
  }, [location.state?.question, location.state?.title]);

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="home-button" onClick={handleHome}>
          <img src={HomeIcon} alt="Home" />
        </button>
        <h1>{title}</h1>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
  {messages.slice(2).map((msg, index) => ( // 첫 번째와 두 번째 메시지를 건너뜁니다.
    <div key={index + 2} className={`chat-message ${msg.sender === 'WBIMH' ? 'bot-message' : 'user-message'}`}>
      <div className="chat-top">
        <span className="chat-name">{msg.sender}</span>
        <span className="chat-time">{msg.time}</span>
      </div>
      <div className="chat-content">{msg.content}</div>
    </div>
  ))}
</div>
      <div className="chat-input-wrapper">
        <input
          type="text"
          placeholder="How can I help you?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-input"
        />
        <button className="send-button" onClick={handleSubmit}>
          <img src={SendIcon} alt="Send" className="send-icon" />
          Send message
        </button>
      </div>
    </div>
  );
}

export default Chat;