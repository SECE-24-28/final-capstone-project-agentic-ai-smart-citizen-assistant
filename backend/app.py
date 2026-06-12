from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.rag.rag_service import ask_rag

app = FastAPI(
    title="Smart Citizen Assistant API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str


@app.get("/")
def health():
    return {
        "message": "Smart Citizen Assistant API Running"
    }


@app.post("/ask")
def ask(request: QueryRequest):

    answer = ask_rag(
        request.question
    )

    return {
        "question": request.question,
        "answer": answer
    }