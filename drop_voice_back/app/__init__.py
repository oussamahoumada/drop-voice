import flask

from .extensions import api,db
from .controllers.user_controller import user_ns
from .controllers.theme_controller import theme_ns
from .controllers.locationController import loactionNs
from .controllers.drop_controller import drop_ns
from .controllers.firebase_authentification_controller import auth_ns

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@db:3306/geovoice_db"

api.init_app(app)
db.init_app(app)

api.add_namespace(user_ns)
api.add_namespace(auth_ns)
api.add_namespace(theme_ns)
api.add_namespace(drop_ns)
api.add_namespace(loactionNs)
