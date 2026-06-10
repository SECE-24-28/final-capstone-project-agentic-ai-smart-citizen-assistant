import os

import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from groq import Groq


load_dotenv()


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CHROMA_DB_PATH = os.path.join(
    BASE_DIR,
    "chroma_db"
)
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

chroma_client = chromadb.PersistentClient(
    path=CHROMA_DB_PATH
)

embedding_function = (
    embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
)

collection = chroma_client.get_collection(
    name="tnesevai",
    embedding_function=embedding_function
)


def ask_rag(question: str):

    results = collection.query(
        query_texts=[question],
        n_results=3
    )

    context = "\n\n".join(
        results["documents"][0]
    )

    prompt = f"""
You are Smart Citizen Assistant for Government Services.

Answer ONLY using the provided context.

Context:
{context}

Question:
{question}
"""

    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content