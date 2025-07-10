from fastapi import UploadFile
import requests
from io import BytesIO
from PIL import Image
import base64

def image_to_base64(file: UploadFile) -> str:
    ext = file.filename.split('.')[-1].lower()
    content = BytesIO(file.file.read())
    img = Image.open(content)
    buffered = BytesIO()
    img.save(buffered, format=img.format)
    b64 = base64.b64encode(buffered.getvalue()).decode()
    return f"data:image/{ext};base64,{b64}"

def url_to_base64(image_url: str) -> str:
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    image_format = img.format.lower()
    buffered = BytesIO()
    img.save(buffered, format=img.format)
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/{image_format};base64,{img_base64}"