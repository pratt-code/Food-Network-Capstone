import json
import os
from elasticsearch import Elasticsearch

two_up = os.path.normpath(os.path.join(__file__,'../'))
file_name = os.path.join(two_up, '../../recipes_raw/recipes_raw_nosource_ar.json')
f = open(file_name, 'r')

recipes = json.load(f)
f.close()

es = Elasticsearch("http://localhost:9200")

for r in recipes:
    rid = r
    title = None
    ingredients = None
    instructions = None

    if 'title' in recipes[r].keys():
        title = recipes[r]['title']
    if 'ingredients' in recipes[r].keys():
        ingredients = recipes[r]['ingredients']
    if 'instructions' in recipes[r].keys():
        instructions = recipes[r]['instructions']
    
    es.index(
    index='recipes',
    document={
    'rid': rid,
    'title': title,
    'ingredients': ingredients,
    'instructions': instructions
    })

