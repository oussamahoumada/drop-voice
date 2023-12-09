import flask

from flask_cors import CORS
from flask_sslify import SSLify
from extensions import api, db
import os
from controllers.user_controller import user_ns
from controllers.theme_controller import theme_ns
from controllers.locationController import loactionNs
from controllers.drop_controller import drop_ns
from controllers.firebase_authentification_controller import auth_ns

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@database-geo-voice:3306/geovoice_db"

cert_path = '/app/certificats/cert.pem'
key_path = '/app/certificats/key.pem'

if __name__ == '__main__':
    context = (cert_path, key_path)
    sslify = SSLify(app, permanent=True)

    api.init_app(app)
    db.init_app(app)

    api.add_namespace(user_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(theme_ns)
    api.add_namespace(drop_ns)
    api.add_namespace(loactionNs)

    CORS(app, supports_credentials=True)

    app.run(debug=True, host='0.0.0.0', port=5000, ssl_context=context)