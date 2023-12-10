from flask_restx import Resource, Namespace

from extensions import db
from models.models import User
from models.user.user_api_model import user_model

user_ns = Namespace("user/")

@user_ns.route("/User/<user_id>")
class UserAPI(Resource):

    @user_ns.marshal_list_with(user_model)
    def get(self, user_id):
        return User.query.get(user_id)