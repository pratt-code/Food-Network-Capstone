import json
import os
from elasticsearch import Elasticsearch


def load(recipes, es):
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
        print(list(recipes.keys()).index(r))

def main():
    two_up = os.path.normpath(os.path.join(__file__,'../'))
    file_name = os.path.join(two_up, '../../recipes_raw/recipes_raw_nosource_ar.json')
    f = open(file_name, 'r')

    recipes = json.load(f)
    f.close()

    es = Elasticsearch("http://localhost:9200")
    mapping = {"mappings": {
                "properties": {
                "rid": { "type": "keyword" },
                "title": { "type": "text" },
                "ingredients": { "type": "text" },
                "instructions": { "type": "text" },
        }
    }
    }
    if es.indices.exists(index="recipes"):
        es.delete_by_query(index='recipes', body={"query": {"match_all": {}}})
    es.indices.create(index='recipes', ignore=400)

    load(recipes, es)

if __name__ == "__main__":
    main()