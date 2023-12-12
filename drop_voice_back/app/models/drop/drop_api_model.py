from extensions import api
from flask_restx import fields

precise_adress_model =  api.model("precise_adress",{
    'precise_adress_id' : fields.Integer,
    'longitude' : fields.Float,
    'latitude' : fields.Float,
})

user_model = api.model("user",{
    'user_id': fields.Integer,
    'name' : fields.String,
    'mail' : fields.String,
})

theme_model = api.model("theme",{
    'libelle': fields.String,
})

drop_model = api.model("drop",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
    '_users':fields.List(fields.Nested(user_model)),
    '_precise_adress':fields.List(fields.Nested(precise_adress_model)),
    '_theme':fields.List(fields.Nested(theme_model)),
})

drop_input_model = api.model("drop_input",{
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'image' : fields.String,
    'audio' : fields.String,
    'date' : fields.Date,
    'longitude' : fields.Float,
    'latitude' : fields.Float,
    'ref_user':fields.Integer,
    'theme':fields.Integer,
})

get_all_drop_model = api.model("get_all_drops",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
    'ref_theme':fields.String,
    'ref_user':fields.Integer,
    '_precise_adress':fields.List(fields.Nested(precise_adress_model)),
})

drop_delete_model = api.model("drop_delete",{
    'drop_id': fields.Integer
})
