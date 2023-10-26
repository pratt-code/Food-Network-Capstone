from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from elasticsearch import Elasticsearch

es = Elasticsearch()
print(f"Connected to ElasticSearch cluster `{es.info()}`")

app = Flask(__name__)

MAX_SIZE = 6

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def home():
    return render_template("index.html")

@app.route("/result")
@cross_origin()
def result_page():
    prompt = request.args["prompt"]
    query = None
    q = None
    size = int(request.args["size"])

    if prompt == "null":
        return render_template("result.html", data=[], query="None")
    elif request.args["auto"] == "1" and request.args["ing"] == "0":
        q = prompt.replace("_", " ")
        query = {
            "query": {
                "match_phrase": {
                    "title": q
                }
            },
            "sort": [
                {
                    "_score": {
                        "order": "desc"
                    }
                }
            ]
        }
        resp = es.search(index="recipes", body=query, size=size)
    elif request.args["auto"] != "1" and request.args["ing"] == "0":
        q = prompt.replace("_", " ")
        query = {
            "query": {
                "match": {
                    "title": {
                        "query": q,
                        "fuzziness": "AUTO"
                    }
                }
            },
            "sort": [
                {
                    "_score": {
                        "order": "desc"
                    }
                }
            ]
        }
    elif request.args["auto"] != "1" and request.args["ing"] == "1":
        q = prompt.replace(",", " AND ")
        query = {
            "query": {
                "query_string": {
                    "fields": ["ingredients"],
                    "query": q
                }
            },
            "sort": [
                {
                    "_score": {
                        "order": "desc"
                    }
                }
            ]
        }
        q = "Ingredients: " + prompt.replace(",", ", ") #Redefine q for printing on result page

    resp = es.search(index="recipes", body=query, size=size)
    print(resp)
    data = [[result['_source']['title'], result['_source']['ingredients'], result['_source']['instructions'], str(result['_source']['calories'])[:-2]] for result in resp['hits']['hits']]

    return render_template("result.html", data=data, query=q)

@app.route("/search")
@cross_origin()
def search_autocomplete():
    query = request.args["q"].lower()
    tokens = query.split(" ")

    clauses = [
        {
            "span_multi": {
                "match": {"fuzzy": {"title": {"value": i, "fuzziness": "AUTO"}}}
            }
        }
        for i in tokens
    ]

    payload = {
        "bool": {
            "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
        }
    }

    resp = es.search(index="recipes", query=payload, size=MAX_SIZE)
    return jsonify([result['_source']['title'] for result in resp['hits']['hits']])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9200, debug=True)
