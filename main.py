from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인에서 접근 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 역할 Enum 정의
class RoleEnum(str, Enum):
    user = "user"
    assistant = "assistant"
    system = "system"

# 메시지 구조 정의
class Message(BaseModel):
    role: RoleEnum  # Enum으로 역할 지정
    content: str

# 요청 형식 정의
class ChatRequest(BaseModel):
    model: str
    messages: List[Message]
    max_tokens: Optional[int] = 150
    temperature: Optional[float] = 0.7

# 응답 형식 정의
class ChatCompletionResponse(BaseModel):
    role: RoleEnum
    content: str

# 대화 응답 엔드포인트 정의
@app.post("/api/chat/completion", response_model=ChatCompletionResponse)
async def chat_completion(request: ChatRequest):
    # 요청에서 마지막 메시지 추출
    last_message = request.messages[-1].content

    # 간단한 응답 생성 (랜덤으로 간단히 처리)
    if "hello" in last_message.lower():
        response_text = "Hello! How can I help you today?"
    # 
    elif "apple" in last_message.lower() and "intel" in last_message.lower() and "실적" in last_message.lower():
        response_text = "애플은 최근 분기 실적에서..."
    else:
        # 임의 응답 생성 예시
        response_text = f"Here's a thoughtful response to: '{last_message}'"

    # ChatCompletionResponse 생성 및 반환
    return ChatCompletionResponse(role=RoleEnum.assistant, content=response_text)

# 서버 실행 명령어
# 터미널에서 아래 명령어로 실행할 수 있습니다.
# uvicorn main:app --reload