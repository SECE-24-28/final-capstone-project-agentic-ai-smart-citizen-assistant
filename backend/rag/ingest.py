# rag/ingest.py

import json
import os

import chromadb
from chromadb.utils import embedding_functions


# ==================================================
# PATHS
# ==================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "..",
    "dataset",
    "tnesevai_dataset.json"
)

CHROMA_DB_PATH = os.path.join(
    BASE_DIR,
    "chroma_db"
)


# ==================================================
# LOAD DATASET
# ==================================================

print("Loading dataset...")

with open(DATASET_PATH, "r", encoding="utf-8") as file:
    data = json.load(file)

services = data.get("services", [])

print(f"Found {len(services)} services")


# ==================================================
# INITIALIZE CHROMADB
# ==================================================

client = chromadb.PersistentClient(
    path=CHROMA_DB_PATH
)

embedding_function = (
    embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="mixedbread-ai/mxbai-embed-large-v1"
    )
)


# ==================================================
# RESET COLLECTION (DEV ONLY)
# ==================================================

try:
    client.delete_collection("tnesevai")
    print("Existing collection deleted")
except Exception:
    pass

collection = client.get_or_create_collection(
    name="tnesevai",
    embedding_function=embedding_function
)


# ==================================================
# PREPARE DOCUMENTS
# ==================================================

documents = []
metadatas = []
ids = []

for idx, service in enumerate(services):

    document = f"""
Service Name:
{service.get("service_name", "")}

Department:
{service.get("department", "")}

Category:
{service.get("category", "")}

Description:
{service.get("description", "")}

Eligibility:
{service.get("eligibility", "")}

Documents Required:
{", ".join(service.get("documents_required", []))}

Application Steps:
{" ".join(service.get("application_steps", []))}

Fee:
{service.get("fee", "")}

Processing Time:
{service.get("processing_time", "")}

Output:
{service.get("output", "")}
"""

    metadata = {
        "service_id": service.get("service_id", ""),
        "service_name": service.get("service_name", ""),
        "department": service.get("department", ""),
        "category": service.get("category", "")
    }

    documents.append(document)
    metadatas.append(metadata)
    ids.append(str(idx))


# ==================================================
# STORE IN CHROMADB
# ==================================================

collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids
)

print(f"Successfully stored {len(documents)} services")
print(f"ChromaDB location: {CHROMA_DB_PATH}")