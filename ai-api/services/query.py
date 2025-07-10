import os
from pinecone.grpc import PineconeGRPC as Pinecone
# from pinecone import ServerlessSpec #future use probably
from typing import List

class PineClient:
    def __init__(self, api_key:str, INDEX_NAME):
        self.client = Pinecone(api_key=api_key)
        self.INDEX_NAME = INDEX_NAME
        self.index = self.client.Index(self.INDEX_NAME)
    
    def text_query(self, embedding) -> List:
        results=self.index.query(
            vector=embedding,
            top_k=5,
            include_values=True,
            include_metadata=True
        )
        product_id = [match["id"] for match in results["matches"]]
        return product_id
    
    def image_query(self, image_url) -> List:
        results=self.index.query(
            vector=image_url,
            top_k=5,
            include_values=True,
            include_metadata=True
        )
        product_id = [match["id"] for match in results["matches"]]
        return product_id