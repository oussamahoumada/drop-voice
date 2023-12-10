from app.extensions import api
from flask_restx import fields

precise_adress_model =  api.model("precise_adress",{
    'precise_adress_id' : fields.Integer,
    'longitude' : fields.Float,
    'latitude' : fields.Float,
})

drop_model = api.model("user_drop",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
    'theme' : fields.String,
    '_precise_adress':fields.List(fields.Nested(precise_adress_model)),
})

user_model = api.model("get_user",{
    'user_id': fields.Integer,
    'name' : fields.String,
    'mail' : fields.String,
    '_drops':fields.List(fields.Nested(drop_model)),
})

