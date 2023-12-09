from extensions import api
from flask_restx import fields

drop_model = api.model("drop",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
})

user_model = api.model("user",{
    'user_id': fields.Integer,
    'name' : fields.String,
    'mail' : fields.String,
    '_drops':fields.List(fields.Nested(drop_model)),
})

