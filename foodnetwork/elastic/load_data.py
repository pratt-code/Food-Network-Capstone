import json
import os
from elasticsearch import Elasticsearch

def load(recipes, es):
    for r in range(len(recipes)):
        rid = r
        title = None
        ingredients = None
        instructions = None
        fat = None
        categories = None
        calories = None
        protein = None
        rating = None
        sodium = None

        if 'title' in recipes[r].keys():
            title = recipes[r]['title']
        if 'ingredients' in recipes[r].keys():
            ingredients = recipes[r]['ingredients']
            i=0
            while i < len(ingredients):
                if ingredients[i] == 'ADVERTISEMENT':
                    ingredients.pop(i)
                else:
                    i += 1
        if 'directions' in recipes[r].keys():
            instructions = recipes[r]['directions']
            inst_str = ", ".join([e for e in instructions])
        if 'fat' in recipes[r].keys():
            fat = recipes[r]['fat']
        if 'categories' in recipes[r].keys():
            categories = recipes[r]['categories']
        if 'calories' in recipes[r].keys():
            calories = recipes[r]['calories']
        if 'protein' in recipes[r].keys():
            protein = recipes[r]['protein']
        if 'rating' in recipes[r].keys():
            rating = recipes[r]['rating']
        if 'sodium' in recipes[r].keys():
            sodium = recipes[r]['sodium']
        
        es.index(
        index='recipes',
        document={
        'title': title,
        'ingredients': ingredients,
        'instructions': inst_str,
        'fat': fat,
        'categories': categories,
        'calories': calories,
        'protein': protein,
        'rating': rating,
        'sodium': sodium,
        })
        print(r)

def main():
    two_up = os.path.normpath(os.path.join(__file__,'../'))
    file_name = os.path.join(two_up, '../../recipes_raw/full_format_recipes.json')
    f = open(file_name, 'r')

    recipes = json.load(f)
    print("Loading JSON File\n")
    f.close()

    es = Elasticsearch("http://localhost:9200")
    mapping = {"mappings": {
                "properties": {
                "rid": { "type": "keyword" },
                "title": { "type": "text" },
                "ingredients": { "type": "text" },
                "instructions": { "type": "text" },
                "fat": { "type": "text" },
                "categories": { "type": "text" },
                "calories": { "type": "text" },
                "protein": { "type": "text" },
                "rating": { "type": "text" },
                "sodium": { "type": "text" },
        }
    }
    }
    if es.indices.exists(index="recipes"):
        es.delete_by_query(index='recipes', body={"query": {"match_all": {}}})
    es.indices.create(index='recipes', ignore=400, body=mapping)

    load(recipes, es)

if __name__ == "__main__":
    main()