// src/components/CHAT/ChatHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/icons/Home.svg';
import './ChatHeader.css';

const ChatHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="chat-header">
      <button className="home-button" onClick={() => navigate('/')}>
        <img src={HomeIcon} alt="Home" />
      </button>
      <h1>{title}</h1>
    </div>
  );
};

export default ChatHeader;