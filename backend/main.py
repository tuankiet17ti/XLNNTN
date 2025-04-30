import uvicorn
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from amazon import get_product_summary

class Product(BaseModel):
    name: str

class Products(BaseModel):
    products: List[Product]
    
app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"products": []}

@app.get("/summary", response_model=Products)
def get_fruits():
    return Products(products = memory_db["products"])

@app.post("/summary")
def add_fruit(product: Product):
    productSummary = get_product_summary(product.name)
    newProduct = Product(name = productSummary)
    memory_db["products"] = [newProduct]
    return newProduct
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)