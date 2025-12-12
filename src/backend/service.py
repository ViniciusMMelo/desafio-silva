import json

def get_db():
    with open("../data/species.json", "r", encoding="utf-8") as file_json:
        data_json = json.load(file_json)

    return data_json

def save_db(data):
    with open("../data/species.json", "w", encoding="utf-8") as file_json:
        json.dump(data, file_json, indent=2, ensure_ascii=False)

# def get_paginate(start, end):
#     get_species = []

#     for i, species in enumerate(get_db()):
#         if i >= start and i < end:
#             get_species.append(species)
    
#         if i >= end:
#             break

#     return get_species  

def get_specie_by_id(id_specie):
    db = get_db()   
    for specie in db:
        if specie["id"] == id_specie:
            return specie
    return None 

def add_species(new_specie_data):
    db = get_db()

    if db:
        novo_id = max(item["id"] for item in db) + 1
    else:
        novo_id = 1

    new_specie = {
        "id": novo_id,
        "commonName": new_specie_data["commonName"],
        "scientificName": new_specie_data["scientificName"],
        "biomes": new_specie_data["biomes"],
        "description": new_specie_data["description"]
    }

    db.append(new_specie)
    save_db(db)
    
    return new_specie

def update_species(id_specie, data_update):
    db = get_db()
    isFound_specie = False

    for index, specie in enumerate(db):
        if specie["id"] == id_specie:
            db[index].update(data_update)
            db[index]["id"] = id_specie 
            isFound_specie = True

            break 

    if isFound_specie:
        save_db(db)

        return db[index] 

    else:
        return None 


def search_species_full(query):
    db = get_db()
    
    if not query:
        return db

    queryLower = query.lower()

    result = []
    
    for specie in db:
        commonName_match = queryLower in specie.get("commonName", "").lower()
        scientificName_match = queryLower in specie.get("scientificName", "").lower()
        description_match = queryLower in specie.get("description", "").lower()
        biomes_match = any(queryLower in b.lower() for b in specie.get("biomes", []))

        # 3. Se for encontrado em QUALQUER um dos lugares, adiciona à lista
        if commonName_match or scientificName_match or description_match or biomes_match:
            result.append(specie)

    return result