# rag/query.py

import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./chroma_db")

embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.get_collection(
    "tnesevai",
    embedding_function=embedding_fn
)

question = "documents required for community certificate"

results = collection.query(
    query_texts=[question],
    n_results=3
)

# Print full results for inspection
print("Full results:")
print(results)

# Show per-result info
for idx, doc in enumerate(results.get("documents", [])[0]):
    dist = results.get("distances", [])[0][idx] if results.get("distances") else None
    meta = results.get("metadatas", [])[0][idx] if results.get("metadatas") else None
    id_ = results.get("ids", [])[0][idx] if results.get("ids") else None
    print(f"\nResult {idx} — id={id_} distance={dist}")
    print("metadata:", meta)
    print(doc)
