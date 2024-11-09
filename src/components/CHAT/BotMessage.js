// src/components/CHAT/BotMessage.js
import React from 'react';
import './BotMessage.css';

const BotMessage = ({ message }) => (
  <div className="chat-message bot-message">
    <div className="chat-top">
      <span className="chat-name">WBIMH</span>
      <span className="chat-time">{message.time}</span>
    </div>
    <div className="chat-content">{message.content}</div>
  </div>
);

export default BotMessage;