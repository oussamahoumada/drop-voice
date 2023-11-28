from app.extensions import api
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

drop_theme_model = api.model("drop_theme",{
    'drop_theme_id': fields.Integer,
    '_themes': fields.List(fields.Nested(theme_model)),
})

drop_model = api.model("drop",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
    '_users':fields.List(fields.Nested(user_model)),
    '_precise_adresses':fields.List(fields.Nested(precise_adress_model)),
    '_drop_themes':fields.List(fields.Nested(drop_theme_model)),
})

drop_input_model = api.model("drop_input",{
    'drop_id': fields.Integer,
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
    'date' : fields.Date,
    'ref_precise_adress':fields.String,
    'ref_user':fields.Integer,
})
