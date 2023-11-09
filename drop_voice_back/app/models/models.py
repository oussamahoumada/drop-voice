from ..extensions import db 

class precise_adress(db.Model):
    precise_adress_id = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    ref_adress = db.Column(db.ForeignKey("adress.location"))

    _adress = db.relationship("adress",back_populates="_precise_adresses")
    _location = db.relationship("drop",back_populates="_precise_adress")

class adress(db.Model):
    location = db.Column(db.String(250), primary_key=True)

    _precise_adresses = db.relationship("precise_adress",back_populates="_adress")
   
class theme(db.Model):
    libelle = db.Column(db.String(250), primary_key=True)

class user(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    mail = db.Column(db.String(250))

    _drops = db.relationship("drop",back_populates="_user")

class drop(db.Model):
    drop_id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(250))
    audio_url = db.Column(db.String(250))
    title = db.Column(db.String(250))
    type = db.Column(db.String(250))
    date = db.Column(db.Date)
    ref_user = db.Column(db.ForeignKey("user.user_id"))
    ref_precise_adress = db.Column(db.ForeignKey("precise_adress.precise_adress_id"))

    _user = db.relationship("user",back_populates="_drops")
    _precise_adress = db.relationship("precise_adress",back_populates="_location")

class drop_theme(db.Model):
    drop_theme_id = db.Column(db.Integer, primary_key=True)
    ref_drop = db.Column(db.ForeignKey("drop.drop_id"))
    ref_theme = db.Column(db.ForeignKey("theme.libelle"))

