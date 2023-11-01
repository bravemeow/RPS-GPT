from flask import Flask,  request
from openai import sendMessage
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


conversation = [
    {"role": "system", "content": "Rock Paper Scissors Game God."},
    {"role": "user", "content": "Let's play Rock Paper Scissors game! Please response only the JSON format without any extra text."}
]

@app.route("/data", methods = ['POST', 'GET'])
def sendData():
    if request.method == 'POST':
        user_move = request.form['move']
        user_json = f'{{"move": "{user_move}"}}'
        user_data = {"role": "user", "content": user_json}
        conversation.append(user_data)
        res_text = sendMessage(conversation)
        system_data = {"role": "assistant", "content": res_text}
        conversation.append(system_data)
        print(conversation)
        return res_text
    else:
        return {"body": "Send message!"}
