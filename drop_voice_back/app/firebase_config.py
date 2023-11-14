import os
import firebase_admin
from firebase_admin import credentials
import json

def set_up_firebase():
    file_path = os.path.join(os.path.dirname(__file__), 'config/config-firebase-admin.json')

    credentials_firebase = credentials.Certificate(json.load(open(file_path)))

    return firebase_admin.initialize_app(credentials_firebase)

