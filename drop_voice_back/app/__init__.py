
import flask
import os
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import api, db
from flask_sslify import SSLify
from controllers.user_controller import user_ns
from controllers.theme_controller import theme_ns
from controllers.locationController import loactionNs
from controllers.drop_controller import drop_ns
from controllers.firebase_authentification_controller import auth_ns

load_dotenv()

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE')

if __name__ == '__main__':

    api.init_app(app)
    db.init_app(app)

    api.add_namespace(user_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(theme_ns)
    api.add_namespace(drop_ns)
    api.add_namespace(loactionNs)

    CORS(app, supports_credentials=True)


    # Pour mettre l'app en HTTPS en mode DEV
    is_exist_cert = os.path.exists('/app/certificats/cert.pem')
    is_exist_key = os.path.exists('/app/certificats/key.pem')

    if os.getenv('ENV') == 'development' and (is_exist_cert and is_exist_key):
        cert_path = '/app/certificats/cert.pem'
        key_path = '/app/certificats/key.pem'
        
        context = (cert_path, key_path)

        sslify = SSLify(app, permanent=True)

        app.run(debug=True, host='0.0.0.0', port=5000, ssl_context=context)
    else :
        app.run(host='0.0.0.0', port=5000)