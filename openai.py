import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

model = "gpt-3.5-turbo"
def sendMessage(conversation):
    res = openai.ChatCompletion.create(
        model=model,
        messages=conversation
    )
    res_text = res.choices[0].message.content
    return res_text