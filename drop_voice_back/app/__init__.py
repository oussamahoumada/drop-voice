import flask

from flask_cors import CORS
from .extensions import api,db
from .controllers.user_controller import user_ns
from .controllers.theme_controller import theme_ns
from .controllers.locationController import loactionNs
from .controllers.firebase_authentification_controller import auth_ns


app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@database-geo-voice:3306/geovoice_db"

api.init_app(app)
db.init_app(app)

CORS(app)

api.add_namespace(user_ns)
api.add_namespace(auth_ns)
api.add_namespace(theme_ns)
api.add_namespace(loactionNs)
