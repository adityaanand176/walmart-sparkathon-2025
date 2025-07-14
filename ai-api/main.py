import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.request_model import EmbedRequest
from models.product_id_model import ProductListResponse
from models.image_request_model import ImageEmbedRequest
from services.embeddings import Cohere
from services.query import PineClient
from utils.data_manip import sort_products
import asyncio

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

origins = [
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

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

    products = sort_products(text_results, image_results)

    return ProductListResponse(products=products)

@app.post("/embed-image", response_model=ProductListResponse)
async def embed_text(request: ImageEmbedRequest) -> ProductListResponse:
    embedding = cohere_client.get_image_embeddings(f"data:{request.image_type};base64,{request.image}")
    
    # Run blocking sync methods in threads concurrently
    text_task = asyncio.to_thread(pinecone_clients["text"].query, embedding, "text")
    image_task = asyncio.to_thread(pinecone_clients["image"].query, embedding, "image")

    text_results, image_results = await asyncio.gather(text_task, image_task)

    products = sort_products(text_results, image_results)
    return ProductListResponse(products=products)