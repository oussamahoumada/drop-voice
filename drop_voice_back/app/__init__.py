import flask
import os
from dotenv import load_dotenv
import pyrebase
from .controllers.firebase_authentification import FirebaseAuthentificationRegistration, FirebaseAuthentificationLogin, auth_ns
# from services.token_service import TokenService

from .extensions import api,db
from .controllers.locationController import loactionNs

app = flask.Flask(__name__)

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/drop_voice_db"

api.init_app(app)
db.init_app(app)

api.add_namespace(loactionNs)
api.add_namespace(auth_ns)
