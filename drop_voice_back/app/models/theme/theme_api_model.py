from extensions import api
from flask_restx import fields

theme_model = api.model("theme",{
    'libelle': fields.String,
})