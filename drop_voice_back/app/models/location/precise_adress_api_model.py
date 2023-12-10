from extensions import api
from flask_restx import fields

precise_adress_model =  api.model("precise_adress",{
    'precise_adress_id' : fields.Integer,
    'longitude' : fields.Float,
    'latitude' : fields.Float,
})

precise_adress_input_model = api.model("precise_adress_input",{
    'longitude' : fields.Float,
    'latitude' : fields.Float,
})