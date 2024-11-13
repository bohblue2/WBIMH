// src/components/CHAT/UserMessage.js
import React from 'react';
import './UserMessage.css'

const UserMessage = ({ message }) => (
  <div className="chat-message user-message">
    <div className="chat-top">
      <span className="chat-name">YOU</span>
      <span className="chat-time">{message.time}</span>
    </div>
    <div className="chat-content">{message.content}</div>
  </div>
);

export default UserMessage;