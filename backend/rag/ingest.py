# rag/ingest.py

import json
import os
import chromadb
from chromadb.utils import embedding_functions

# Resolve dataset and DB paths relative to this file
BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "dataset", "tnesevai_dataset.json"))
DB_FILE = os.path.normpath(os.path.join(BASE_DIR, "chroma_db", "chroma.sqlite3"))

with open(DATASET_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

documents = []
metadatas = []

for service in data.get("services", []):

    text = f"""
    Service Name: {service.get('service_name')}

    Department: {service.get('department')}

    Description:
    {service.get('description')}

    Eligibility:
    {service.get('eligibility')}

    Documents Required:
    {', '.join(service.get('documents_required', []))}

    Application Steps:
    {' '.join(service.get('application_steps', []))}

    Fee:
    {service.get('fee')}

    Processing Time:
    {service.get('processing_time')}
    """

    documents.append(text)
    metadatas.append({
        "service_name": service.get('service_name'),
        "department": service.get('department'),
        "documents_required": service.get('documents_required', [])
    })

print(f"Loaded {len(documents)} services from {DATASET_PATH}")

# Remove existing sqlite DB to ensure a fresh re-ingest (safe for dev)
if os.path.exists(DB_FILE):
    print(f"Removing existing DB file at {DB_FILE}")
    try:
        os.remove(DB_FILE)
    except Exception as e:
        print(f"Warning: failed to remove DB file: {e}")

client = chromadb.PersistentClient(path="./chroma_db")

embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.get_or_create_collection(
    name="tnesevai",
    embedding_function=embedding_fn
)

for i, (doc, meta) in enumerate(zip(documents, metadatas)):
    collection.add(
        documents=[doc],
        ids=[str(i)],
        metadatas=[meta]
    )
    if (i + 1) % 50 == 0 or i == len(documents) - 1:
        print(f"Added {i+1}/{len(documents)}: {meta.get('service_name')}")

print("Stored in ChromaDB with metadata")