// src/components/CHAT/Chat.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Chat.css';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

const generateResponse = (question) => {
  return `This is a generated response to the question: "${question}"`;
};

function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState(location.state?.title || 'Default Title');

  useEffect(() => {
    console.log("useEffect triggered with question:", location.state?.question);
    if (location.state?.question) {
      const initialMessage = {
        type: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        content: location.state.question,
      };

      const initialBotResponse = {
        type: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        content: generateResponse(location.state.question),
      };

      setMessages((prevMessages) => [...prevMessages, initialMessage, initialBotResponse]);
      console.log("Initial messages:", [initialMessage, initialBotResponse]);
    }

    if (location.state?.title) {
      setTitle(location.state.title);
    }
  }, [location.state]);

  const handleSubmit = (messageToSend) => {
    console.log("handleSubmit called with messageToSend:", messageToSend);
    if (!messageToSend.trim()) return;

    const userMessage = {
      type: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: messageToSend,
    };

    const botResponse = {
      type: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: generateResponse(messageToSend),
    };

    // setMessages에 함수형 업데이트 적용
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage, botResponse];
      console.log("Updated messages in setMessages:", updatedMessages);
      return updatedMessages;
    });
  };

  return (
    <div className="chat-page">
      <ChatHeader title={title} />
      <ChatBody messages={messages} />
      <ChatInput onSend={handleSubmit} />
    </div>
  );
}

export default Chat;