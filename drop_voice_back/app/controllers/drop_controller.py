from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import drop
from ..models.drop.drop_api_model import drop_model

drop_ns = Namespace("drop/")

@drop_ns.route("/Drop")
class themeAPI(Resource):
    @drop_ns.marshal_list_with(drop_model)
    def get(self):
        return drop.query.all()