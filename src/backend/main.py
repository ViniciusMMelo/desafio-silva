from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from service import get_db, add_species, search_species_full, update_species, get_specie_by_id
from schemas import SpeciesCreate, SpeciesResponse
from typing import Optional

app = FastAPI(
    title="Rest API com FastAPI",
    version="1.0.0"
)

origins = [
    "https://friendly-goldfish-pv9v5454x6r369rq-3000.app.github.dev",
    "http://localhost:3000",
    "https://desafio-silva-front.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app_route = APIRouter(tags=['Species'])

@app_route.get("/species")
def return_species(start: int = None, end: int = None, search: Optional[str] = None):
    if search:
        data = search_species_full(search)
    else:
        data = get_db()

    if start is not None and end is not None:
        final_result = data[start:end]
        return final_result
    
    return data

@app_route.get("/species/{id_specie}", response_model=SpeciesResponse)
def return_species_by_id(id_specie: int):
    result = get_specie_by_id(id_specie)

    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Espécie não encontrada")

@app_route.post("/species", response_model=SpeciesResponse)
def create_species_route(species: SpeciesCreate):
    data_dict = species.dict()
    new_specie = add_species(data_dict)
    
    return new_specie

@app_route.put("/species/{id_specie}", response_model=SpeciesResponse)
def update_species_route(id_specie: int, species: SpeciesCreate):
    data_dict = species.dict()
    result = update_species(id_specie, data_dict)
    
    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Espécie não encontrada")

app.include_router(app_route)