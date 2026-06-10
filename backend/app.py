from fastapi import FastAPI
from pydantic import BaseModel

from rag.rag_service import ask_rag

app = FastAPI(
    title="Smart Citizen Assistant API"
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