from fastapi import FastAPI
from service import get_paginate, get_db

app = FastAPI()

@app.get("/species")
def return_species(start: int = None, end: int = None):
    
    if start is not None and end is not None:
        page = get_paginate(start, end)
        return page
        
    else:
        return get_db()