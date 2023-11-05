from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import drop
from ..models.api_models import drop_model

dropNs = Namespace("Drop")

@dropNs.route("")
class dropAPI(Resource):
    @dropNs.marshal_list_with(drop_model)
    def get(self):
        return drop.query.all()