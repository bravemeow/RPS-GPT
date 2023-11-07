import os
import openai
from dotenv import load_dotenv
import random

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

model = "gpt-3.5-turbo"
moveList = ['Rock','Paper','Scissors']

def checkWinner(data):
    botMove = randomMove()
    userMove = data['userMove']
    if ((userMove == "Rock" and botMove == "Scissors") or (userMove == "Paper" and botMove == "Rock") or (userMove == "Scissors" and botMove == "Paper")):
        return {"userMove": userMove, "botMove": botMove, "winner": "user"}
    elif (userMove == botMove):
        return {"userMove": userMove, "botMove": botMove, "winner": "tied"}
    else:
        return {"userMove": userMove, "botMove": botMove, "winner": "bot"}


def randomMove():
    pickMove = random.choice(moveList)
    return pickMove