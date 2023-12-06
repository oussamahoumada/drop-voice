from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import theme
from ..models.theme.theme_api_model import theme_model

theme_ns = Namespace("theme/")

@theme_ns.route("/Theme")
class ThemeAPI(Resource):
    @theme_ns.marshal_list_with(theme_model)
    def get(self):
        return theme.query.all()