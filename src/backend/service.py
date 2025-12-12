import json

def get_db():
    with open("../data/species.json", "r", encoding="utf-8") as file_json:
        data_json = json.load(file_json)

    return data_json


def get_paginate(start, end):
    get_species = []

    for i, species in enumerate(get_db()):
        if i >= start and i < end:
            get_species.append(species)
    
        if i >= end:
            break

    return get_species  

