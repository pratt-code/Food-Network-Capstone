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


@app.route("/result_data")
@cross_origin()
def search_result():
    query = request.args["q"].lower()
    tokens = query.split(" ")

    clauses = [
        {
            "span_multi": {
                "match": {"title": {"value": i}}
            }
        }
        for i in tokens
    ]

    payload = {
        "bool": {
            "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
        }
    }

    resp = es.search(index="recipes", query=payload, size=5)
    return [[result['_source']['title'], result['_source']['ingredients'], result['_source']['instructions']] for result in resp['hits']['hits']]

@app.route("/result")
@cross_origin()
def result_page():
    return render_template("result.html")

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
    print(resp)
    return jsonify([result['_source']['title'] for result in resp['hits']['hits']])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9200, debug=True)
