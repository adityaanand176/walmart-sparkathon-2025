from pydantic import BaseModel
from typing import List

class ProductListResponse(BaseModel):
    products : List[str]