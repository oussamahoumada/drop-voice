from flask import Flask
from .extensions import api,db
from .controllers.locationController import loactionNs

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/drop_voice_db"

    api.init_app(app)
    db.init_app(app)

    api.add_namespace(loactionNs)
    return app