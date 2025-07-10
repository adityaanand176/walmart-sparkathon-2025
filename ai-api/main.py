import os
from fastapi import FastAPI, UploadFile
from models.request_model import EmbedRequest
from models.product_id_model import ProductListResponse
from services.embeddings import Cohere
from services.query import PineClient


from dotenv import load_dotenv
load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

cohere_client = Cohere(COHERE_API_KEY)
pinecone_client = PineClient(PINECONE_API_KEY, "walmart-sparkathon-images")
app = FastAPI(debug=True)

@app.post("/embed-text", response_model=ProductListResponse)
async def embed_text(request: EmbedRequest):
    embedding = cohere_client.get_text_embeddings(request.query)
    products = pinecone_client.text_query(embedding=embedding)
    return ProductListResponse(products=products)



