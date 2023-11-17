import os
from dotenv import load_dotenv
import pyrebase

def set_up_pyrebase():
    load_dotenv()

    config = {
        "apiKey": os.getenv('API_KEY'),
        "authDomain": os.getenv('AUTH_DOMAIN'),
        "projectId": os.getenv('PROJECT_ID'),
        "storageBucket": os.getenv('STORAGE_BUCKET'),
        "messagingSenderId": os.getenv('MESSAGING_SENDER_ID'),
        "databaseURL": os.getenv('DATABASE_URL'),
        "appId": os.getenv('APP_ID')
    }

    return pyrebase.initialize_app(config)
