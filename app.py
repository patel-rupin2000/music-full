from flask import Flask, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient

app = Flask(__name__)
CORS(app)
uri = "mongodb+srv://patelrupin63:Alka%401975@userdata.r7awmmw.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.route('/signUp', methods=['POST'])
def storeSignUpData():
    userInfoDatabase = client["userData"]
    usersCollection = userInfoDatabase["users"]
    data = request.get_json()
    usersCollection.insert_one(data)
    return "Stored Data Successfully"

if __name__ == '__main__':
    app.run()
