from pydantic import BaseModel

class ImageEmbedRequest(BaseModel):
    image: str
    image_type: str