import json
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import User
from ..pyrebase_config import set_up_pyrebase
from ..services.token_service import TokenService
from ..models.auth.auth_api_model import login_model, register_model, logout_model

auth_ns = Namespace("auth/")
auth = set_up_pyrebase().auth()

@auth_ns.route("/register")
class FirebaseAuthentificationRegistration(Resource):

    @auth_ns.expect(register_model)
    def post(self) -> json:
        email: str = auth_ns.payload['email']
        password: str = auth_ns.payload['password']
        first_name: str = auth_ns.payload['first_name']
        last_name: str = auth_ns.payload['last_name']

        name: str = first_name + ' ' + last_name

        user: User = User(
            name = name,
            mail = email
        )

        db.session.add(user)
        db.session.commit()

        try:
            user_firebase: dict = auth.create_user_with_email_and_password(email, password)
            auth.update_profile(display_name=name, id_token=user_firebase['idToken'])

            content: dict = {
                'success': True,
                'user': user_firebase
            }
            code: int = 200

        except Exception as e:
            content: dict = {
                'success': False,
                'message': 'Erreur lors de la création du compte avec l\'email ' + email,
                'error': str(e),
            }
            code: int = 403


        return content, code

@auth_ns.route("/login")
class FirebaseAuthentificationLogin(Resource):
   
    @auth_ns.expect(login_model)
    def post(self) -> json:
        email: str = auth_ns.payload['email']
        password: str = auth_ns.payload['password']

        try:
            auth_user: dict = auth.sign_in_with_email_and_password(email, password)
            user: int = User.query.filter_by(mail=email).first()

            response: dict = {
                'id': user.user_id,
                'user': auth_user,
                'success': True
            }
            code: int = 200
        except Exception as e:
            response: dict = {
                'message': 'Échec de l\'authentification',
                'error': 'Échec de l\'authentification : ' + str(e),
                'success': False
            }
            code: int = 401

        return response, code


@auth_ns.route('/logout')
class FirebaseAuthentificationLogout(Resource):
   
    @auth_ns.expect(logout_model)
    def post(self) -> json:
        token: str = auth_ns.payload['idToken']
        decoded_token = TokenService.decode_token(self, token)

        if 'error' in decoded_token:
            return {'success': False, 'error': 'Le token n\'existe pas'}

        user_id: str = decoded_token['decode']['user_id']
        TokenService.handle_logout(self, user_id)

        return {'success': True}, 200

