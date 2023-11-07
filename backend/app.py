from flask import Flask, request, json
from flask_cors import CORS, cross_origin
from gpt import checkWinner

app = Flask(__name__)
cors = CORS(app, origins="http://localhost:5173")
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/move", methods=['POST', 'GET'])
def sendData():
    if request.method == 'POST':
        data = json.loads(request.get_data())
        res_text = checkWinner(data)
        print(data)
        return res_text
    else:
        return json.dumps({"error": "error"})

