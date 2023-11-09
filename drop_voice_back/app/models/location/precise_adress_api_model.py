from ...extensions import api
from flask_restx import fields

precise_adress_model =  api.model("precise_adress",{
    'precise_adress_id' : fields.Integer,
    'longitude' : fields.Float,
    'latitude' : fields.Float,
    'ref_adress' : fields.String,
})

precise_adress_input_model = api.model("precise_adress_input",{
    'longitude' : fields.Float,
    'latitude' : fields.Float,
    'adress' : fields.String,
})

adress_model = api.model("adress",{
    'location' : fields.String,
    '_precise_adresses':fields.List(fields.Nested(precise_adress_model)),
})

adress_input_model = api.model("adress_input",{
    'location' : fields.String,
})