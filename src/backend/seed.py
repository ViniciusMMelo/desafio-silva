import json
import os
from supabase import create_client
from dotenv import load_dotenv

# 1. Carrega as chaves do .env
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("ERRO: Configure o arquivo .env primeiro!")
    exit()

supabase = create_client(url, key)

try:
    with open("data/species.json", "r", encoding="utf-8") as f:
        dados_antigos = json.load(f)
        print(f"Lido {len(dados_antigos)} espécies do arquivo.")
except FileNotFoundError:
    print("ERRO: Arquivo data/species.json não encontrado.")
    exit()

# 3. Prepara os dados (Converte camelCase para snake_case)
dados_para_banco = []

for item in dados_antigos:
    nova_especie = {
        "common_name": item.get("commonName"),       
        "scientific_name": item.get("scientificName"),
        "biomes": item.get("biomes"),          
        "description": item.get("description")
    }
    dados_para_banco.append(nova_especie)

# 4. Envia tudo para o Supabase
print("Enviando para o Supabase...")

try:
    # O .insert aceita uma lista para fazer inserção em lote (bulk insert)
    data = supabase.table("species").insert(dados_para_banco).execute()
    print("Sucesso! Dados migrados.")
except Exception as e:
    print(f"Ocorreu um erro ao salvar: {e}")