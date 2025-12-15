import json
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Erro: SUPABASE_URL e SUPABASE_KEY precisam estar no arquivo .env ou nas variáveis da Vercel.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def format_specie_to_frontend(db_item):
    if not db_item:
        return None
    return {
        "id": db_item.get("id"),
        "commonName": db_item.get("common_name"),
        "scientificName": db_item.get("scientific_name"),
        "biomes": db_item.get("biomes"), # O Postgres já devolve como lista
        "description": db_item.get("description")
    }

def get_db():
    response = supabase.table("species").select("*").order("id").execute()

    return [format_specie_to_frontend(item) for item in response.data]


def get_specie_by_id(id_specie):
    response = supabase.table("species").select("*").eq("id", id_specie).execute()
    
    if response.data:
        return format_specie_to_frontend(response.data[0])
    return None

def add_species(new_specie_data):

    payload = {
        "common_name": new_specie_data.get("commonName"),
        "scientific_name": new_specie_data.get("scientificName"),
        "biomes": new_specie_data.get("biomes"),
        "description": new_specie_data.get("description")
    }

    response = supabase.table("species").insert(payload).execute()
    
    if response.data:
        return format_specie_to_frontend(response.data[0])
    return None

def update_species(id_specie, data_update):
    payload = {}
    
    if "commonName" in data_update:
        payload["common_name"] = data_update["commonName"]
    if "scientificName" in data_update:
        payload["scientific_name"] = data_update["scientificName"]
    if "biomes" in data_update:
        payload["biomes"] = data_update["biomes"]
    if "description" in data_update:
        payload["description"] = data_update["description"]

    if not payload:
        return get_specie_by_id(id_specie)

    response = supabase.table("species").update(payload).eq("id", id_specie).execute()

    if response.data:
        return format_specie_to_frontend(response.data[0])
    return None

def search_species_full(query):
    if not query:
        return get_db()

    search_filter = f"common_name.ilike.%{query}%,scientific_name.ilike.%{query}%,description.ilike.%{query}%"
    
    response = supabase.table("species").select("*").or_(search_filter).execute()
    
    return [format_specie_to_frontend(item) for item in response.data]