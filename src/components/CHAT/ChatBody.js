// src/components/CHAT/ChatBody.js
import React, { useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import './ChatBody.css';

const ChatBody = ({ messages }) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // 새로운 메시지가 추가될 때마다 스크롤을 최신 메시지로 이동
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-body" ref={chatBodyRef}>
      {messages.map((msg, index) =>
        msg.type === 'user' ? (
          <UserMessage key={index} message={msg} />
        ) : (
          <BotMessage key={index} message={msg} />
        )
      )}
    </div>
  );
};

export default ChatBody;