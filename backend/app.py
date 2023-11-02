from flask import Flask, request, json
from flask_cors import CORS, cross_origin
from gpt import sendMessage

app = Flask(__name__)
cors = CORS(app, origins="http://localhost:5173")
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/move", methods=['POST', 'GET'])
def sendData():
    if request.method == 'POST':
        data = json.loads(request.get_data())
        user_conversation = data['conversation']
        res_text = sendMessage(user_conversation)
        print(res_text)
        return res_text
    else:
        return json.dumps({"error": "Hi"})

