from flask import Flask, render_template, request
from openai import sendMessage

app = Flask(__name__)

conversation = [
    {"role": "system", "content": "Rock Paper Scissors Game God."},
    {"role": "user", "content": "Let's play Rock Paper Scissors game! Please response only the JSON format without any extra text."}
]
@app.route("/")
def hello_world():
    return render_template('index.html')

@app.post("/data")
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
        return render_template('index.html', res_text=res_text)
    

app.run(host='localhost', port=5000, debug=True)