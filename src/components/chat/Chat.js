// src/components/CHAT/Chat.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

const Chat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState(location.state?.title || 'WBIMH');

  useEffect(() => {
    if (location.state?.question) {
      const initialMessage = {
        type: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        content: location.state.question,
      };

      setMessages((prevMessages) => [...prevMessages, initialMessage]);
      handleAPICall(location.state.question); // 초기 질문에 대한 API 호출
    }

    if (location.state?.title) {
      setTitle(location.state.title);
    }
  }, [location.state]);

  const handleAPICall = async (messageToSend) => {
    try {
      // 이전 메시지들을 포함한 메시지 배열 생성
      const messageHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // 새로운 메시지 추가
      messageHistory.push({
        role: 'user',
        content: messageToSend
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat/completion`,
        {
          model: "gpt-3.5-turbo",
          messages: messageHistory,
          max_tokens: 150,
          temperature: 0.7,
        },
        { headers: { "Content-Type": "application/json" } }
      );
    
      // FastAPI 응답에서 'content' 사용
      const botMessage = {
        type: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        content: response.data.content, // FastAPI 응답의 content 필드 사용
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // 서버 응답에서 요약된 제목이 있을 경우, title 상태 업데이트
      if (response.data.summary) {
        setTitle(response.data.summary);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const handleSubmit = (messageToSend) => {
    if (!messageToSend.trim()) return;

    const userMessage = {
      type: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: messageToSend,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    handleAPICall(messageToSend); // 사용자가 보낸 메시지를 서버에 전달
  };

  return (
    <div className="chat-page">
      <ChatHeader title={title} />
      <ChatBody messages={messages} />
      <ChatInput onSend={handleSubmit} />
    </div>
  );
};

export default Chat;