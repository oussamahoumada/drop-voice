from app.extensions import api
from flask_restx import fields

login_model = api.model("login",{
    'email' : fields.String,
    'password' : fields.String,
})

register_model = api.model("register",{
    'email' : fields.String,
    'password' : fields.String,
    'first_name' : fields.String,
    'last_name' : fields.String,
})