from ..extensions import api
from flask_restx import fields

drop_model = api.model("drop",{
    'url' : fields.String,
    'title' : fields.String,
    'type' : fields.Date,
})

user_model = api.model("user",{
    'name' : fields.String,
    'mail' : fields.String,
})

theme_model = api.model("drop",{
    'libelle' : fields.String,
})

theme_model = api.model("drop",{
    'location' : fields.String,
})
