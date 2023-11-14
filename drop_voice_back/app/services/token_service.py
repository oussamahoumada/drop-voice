import firebase_admin
from firebase_admin import auth
import flask

class TokenService:
    def __init__(self, app: flask.Flask):
        self._app = app
        self._firebase = firebase_admin
        self.auth = auth
        self.credential = self._firebase.credentials.Certificate('./config/config-firebase-admin.json')
        self._firebase.initialize_app(self.credential)
        self.token_blueprint = flask.Blueprint('token', __name__)
        self.init_routes()
        self._app.register_blueprint(self.token_blueprint)

    def init_routes(self):
        self.token_blueprint.route('/verify', methods=['POST'])(self.verify)
        self.token_blueprint.route('/logout', methods=['POST'])(self.logout)

    def verify(self, token: str) -> dict|None:
        decoded_token = self.auth.verify_id_token(token)

        return decoded_token if True else False

    def logout(self):
        token_user: dict = flask.request.get_json()

        decoded_token: dict = self.verify(token_user['idToken'])
        user_id: str = decoded_token['decode']['user_id']

        self.auth.revoke_refresh_tokens(user_id)

        return flask.jsonify({'success': True}), 200
        