from pymongo import MongoClient
import os
from dotenv import load_dotenv
import datetime
import tzlocal

load_dotenv()

client = MongoClient(os.getenv("MONGO_KEY"))
db = client["rps_db"]
users = db["users"]

user = {
    "name": "Noah",
    "rock": 3,
    "paper": 2,
    "scissors": 3,
    "Streak": 8,
    "date": datetime.datetime.utcnow()
}
# users.insert_one(user)