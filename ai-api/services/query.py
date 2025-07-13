import os
from pinecone.grpc import PineconeGRPC as Pinecone
# from pinecone import ServerlessSpec #future use probably
from typing import List

class PineClient:
    def __init__(self, api_key:str, INDEX_NAME):
        self.client = Pinecone(api_key=api_key)
        self.INDEX_NAME = INDEX_NAME
        self.index = self.client.Index(self.INDEX_NAME)
    
    def query(self, embedding:List[float], db="text") -> List:
        results=self.index.query(
            vector=embedding,
            top_k=20,
            include_values=True,
            include_metadata=True
        )
        if db=="text": 
            product_id = [(match["id"], match["score"]) for match in results["matches"]]
        elif db=="image":
            product_id = [(str(int(match["metadata"]["sku"])), match["score"]) for match in results["matches"]]
        return product_id
