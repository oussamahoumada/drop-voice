from ..extensions import api
from flask_restx import fields

drop_model = api.model("drop",{
    'title' : fields.String,
    'image_url' : fields.String,
    'audio_url' : fields.String,
})

user_model = api.model("user",{
    'name' : fields.String,
    'mail' : fields.String,
})

theme_model = api.model("theme",{
    'libelle' : fields.String,
})

adress_model = api.model("adress",{
    'location' : fields.String,
})
