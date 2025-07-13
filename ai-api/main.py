import os
from fastapi import FastAPI, UploadFile
from models.request_model import EmbedRequest
from models.product_id_model import ProductListResponse
from services.embeddings import Cohere
from services.query import PineClient
from utils.data_manip import sort_products
import asyncio

from dotenv import load_dotenv
load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

app = FastAPI(debug=True)
cohere_client = Cohere(COHERE_API_KEY)
pinecone_clients = {
    "text": PineClient(PINECONE_API_KEY, "walmart-text"),
    "image": PineClient(PINECONE_API_KEY, "walmart-images"),
}

@app.post("/embed-text", response_model=ProductListResponse)
async def embed_text(request: EmbedRequest) -> ProductListResponse:
    embedding = cohere_client.get_text_embeddings(request.query)

    # Run blocking sync methods in threads concurrently
    text_task = asyncio.to_thread(pinecone_clients["text"].query, embedding, "text")
    image_task = asyncio.to_thread(pinecone_clients["image"].query, embedding, "image")

    text_results, image_results = await asyncio.gather(text_task, image_task)
    print(text_results, image_results)

    products = sort_products(text_results, image_results)

    return ProductListResponse(products=products)
