import json
from flask_restx import Resource, Namespace
from ..models.auth.auth_api_model import login_model, register_model
auth_ns = Namespace("auth/")

from ..pyrebase_config import set_up_pyrebase, set_test

auth = set_up_pyrebase().auth()

@auth_ns.route("/register")
class FirebaseAuthentificationRegistration(Resource):

    @auth_ns.expect(register_model)
    def post(self) -> json:
        email: str = auth_ns.payload['email']
        password: str = auth_ns.payload['password']
        firstname: str = auth_ns.payload['first_name']
        lastname: str = auth_ns.payload['last_name']

        try:
            user: dict = auth.create_user_with_email_and_password(email, password)
            auth.update_profile(display_name=firstname + ' ' + lastname, id_token=user['idToken'])

            content: dict = {
                'success': True,
                'user': user
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

            response: dict = {
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
