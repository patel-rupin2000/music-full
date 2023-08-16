import logging
from flask import Flask, request, send_file
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pydub import AudioSegment
from gridfs import GridFS
import io
from waitress import serve
import os

from werkzeug.utils import secure_filename

app = Flask(__name__)
<<<<<<< Updated upstream
CORS(app)
uri = "mongodb+srv://<userName>:<password>@userdata.r7awmmw.mongodb.net/?retryWrites=true&w=majority"
=======
CORS(app, expose_headers='Authorization')
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

uri = "mongodb+srv://patelrupin63:Alka%401975@userdata.r7awmmw.mongodb.net/?retryWrites=true&w=majority"
>>>>>>> Stashed changes
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

@app.route('/api/upload', methods=['POST'])
def upload():
    uuid = request.form['uuid']
    music_database = client[str(uuid)]
    fs = GridFS(music_database)
    music_files = request.files.getlist('musicFiles')
    overlaid_music = AudioSegment.from_file(music_files[0])
    for music_file in music_files[1:]:
        overlaid_music.overlay(AudioSegment.from_file(music_file))
    music_data = io.BytesIO()
    overlaid_music.export(music_data, format='mp3')
    file_id = fs.put(music_data.getvalue(), filename=uuid)
    return {'file_id': str(file_id)}

@app.route('/api/download/<uuid>', methods=['GET'])
def download(uuid):
    music_database = client[str(uuid)]
    fs = GridFS(music_database)
    grid_out = fs.find_one({'filename': uuid})
    if not grid_out:
        return 'File not found', 404
    data = grid_out.read()
    return send_file(io.BytesIO(data), download_name=f'{uuid}.mp3', as_attachment=True)

@app.route('/api/check/<uuid>', methods=['GET'])
def check(uuid):
    music_database = client[str(uuid)]
    fs = GridFS(music_database)
    grid_out = fs.find_one({'filename': uuid})
    if not grid_out:
        return 'File not found', 404
    return 'File found'

@app.route('/api/delete/<uuid>', methods=['DELETE'])
def delete(uuid):
    music_database = client[str(uuid)]
    fs = GridFS(music_database)
    grid_out = fs.find_one({'filename': uuid})
    if not grid_out:
        return 'File not found', 404
    fs.delete(grid_out._id)
    return 'Success'

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    serve(app.run(debug=True,host="0.0.0.0",use_reloader=False))
