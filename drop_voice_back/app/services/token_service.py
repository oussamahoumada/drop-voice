from firebase_admin import auth
from ..firebase_config import set_up_firebase

set_up_firebase()
class TokenService:
    def decode_token(self, token: str) -> dict|None:

        try:
            decoded_token = auth.verify_id_token(token)

            return {
                'token': token,
                'decode': decoded_token,
            }
        except auth.InvalidIdTokenError as e:
            return {
                'error': 'Invalid token',
                'message': str(e)
            }
        except Exception as e:
            return {
                'error': 'An error occurred',
                'message': str(e)
            }
    
    def handle_logout(self, user_id: str):
        auth.revoke_refresh_tokens(user_id)

