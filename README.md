# Smart Citizen Assistant for Government Services

## 1. Problem Statement

Citizens face significant challenges when accessing government services. They struggle to find relevant schemes, understand eligibility criteria, gather required documents, follow application procedures, and navigate scattered information across multiple sources.

## 2. Solution

The Smart Citizen Assistant solves these problems with an AI-powered guidance system. It uses Retrieval-Augmented Generation (RAG) to answer user questions, provide government service guidance, generate document checklists, assist with eligibility, and explain application procedures.

## 3. Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Python, FastAPI
- Database: MongoDB
- Agent Framework: LangGraph, LangChain
- Vector Database: ChromaDB
- LLM: Groq (OpenAI-Compatible Models)
- Embeddings: Sentence Transformers

## 4. Project Folder Structure

```text
backend/
├── app.py
├── dataset/
│   └── tnesevai_dataset.json
├── rag/
│   ├── ingest.py
│   ├── rag_service.py
│   └── chroma_db/
├── .env
└── requirements.txt
```

## 5. Dataset Source

The dataset was collected from the Tamil Nadu e-Sevai Portal, government service user manuals, and official government service information. It includes:

- Service names
- Departments
- Eligibility criteria
- Required documents
- Fees
- Processing times
- Application procedures
- FAQs

## 6. Steps to Execute the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/SECE-24-28/final-capstone-project-agentic-ai-smart-citizen-assistant.git
```

### Step 2: Create Virtual Environment

Windows:

```bash
python -m venv venv
```

### Step 3: Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Create a `.env` file and add:

```env
GROQ_API_KEY=your_groq_api_key
```

### Step 6: Generate Vector Database

Run:

```bash
python rag/ingest.py
```

This converts the dataset into embeddings and stores them in ChromaDB.

### Step 7: Run the FastAPI Application

Run:

```bash
uvicorn app:app --reload
```

The API server will start locally.

## 7. API Testing

Test the application using the FastAPI Swagger UI at:

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

You can send questions such as:

- What documents are required for Income Certificate?
- How do I apply for Community Certificate?
- What is the processing time for Nativity Certificate?

## 8. Future Enhancements

- Multi-Agent Architecture
- Multilingual Support (Tamil and English)
- Voice-Based Interaction
- Real-Time Government API Integration
- Application Status Tracking
- Personalized Scheme Recommendations
- Mobile Application Support
- Advanced Eligibility Verification

## Project Status

**🚧 Under Development**
