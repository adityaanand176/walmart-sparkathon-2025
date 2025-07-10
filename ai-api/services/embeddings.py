import cohere
import os
from typing import List

class Cohere:
    def __init__(self, api_key:str, EMBED_MODEL:str="embed-v4.0"):
        self.client = cohere.ClientV2(api_key=api_key)
        self.EMBED_MODEL = EMBED_MODEL
    
    def get_text_embeddings(self, query:str) -> List:
        response = self.client.v2.embed(
            texts=[query],
            model=self.EMBED_MODEL,
            output_dimension=1024, #gonna change this latur
            input_type="search_document",  # use "search_query" when embedding queries
            embedding_types=["float"]  # specify embedding type
        )
        return response.embeddings.float[0]
    
    def get_image_embeddings(self, image_url:str) -> List:
        response = self.client.v2.embed(
            images=[image_url],
            model=self.EMBED_MODEL,
            output_dimension=1024,
            input_type="search_document",
            embedding_types=["float"]  # specify embedding type
        )
        return response.embeddings.float[0]