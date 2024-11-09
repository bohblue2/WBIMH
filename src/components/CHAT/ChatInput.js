// src/components/CHAT/ChatInput.js
import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '../../assets/icons/send.svg';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false); // IME 상태 추적
  const inputRef = useRef(null); // input 요소에 대한 참조 생성

  useEffect(() => {
    // 컴포넌트가 마운트될 때 input에 포커스 설정
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isComposing) { // IME 조합이 끝난 후에만 전송
      event.preventDefault();
      onSend(inputValue);
      setInputValue(''); // 입력 필드 초기화
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true); // 한글 입력 시작 (IME 조합 중)
  };

  const handleCompositionEnd = (event) => {
    setIsComposing(false); // 한글 입력 완료 (IME 조합 끝)
    setInputValue(event.target.value); // 최종 한글 입력 상태 반영
  };

  return (
    <div className="chat-input-wrapper">
      <input
        ref={inputRef} // input 요소에 ref 연결
        type="text"
        placeholder="How can I help you?"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className="chat-input"
      />
      <button
        className="send-button"
        onClick={() => {
          onSend(inputValue);
          setInputValue('');
        }}
      >
        <img src={SendIcon} alt="Send" className="send-icon" />
      </button>
    </div>
  );
};

export default ChatInput;