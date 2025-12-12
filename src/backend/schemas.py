from pydantic import BaseModel
from typing import List, Optional

class SpeciesBase(BaseModel):
    commonName: str
    scientificName: str
    biomes: List[str]
    description: Optional[str] = None

class SpeciesCreate(SpeciesBase):
    pass 

class SpeciesResponse(SpeciesBase):
    id: int

    class Config:
        from_attributes = True