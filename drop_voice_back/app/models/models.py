from ..extensions import db 

class precise_adress(db.Model):
    precise_adress_id = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)

    _drops = db.relationship("drop",back_populates="_precise_adress")
   
class theme(db.Model):
    libelle = db.Column(db.String(250), primary_key=True)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    mail = db.Column(db.String(250))

    _drops = db.relationship("drop", back_populates="_user")

class drop(db.Model):
    drop_id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(250))
    audio_url = db.Column(db.String(250))
    title = db.Column(db.String(250))
    date = db.Column(db.Date)
    ref_user = db.Column(db.ForeignKey("user.user_id"))
    ref_theme = db.Column(db.ForeignKey("theme.libelle"))
    ref_precise_adress = db.Column(db.ForeignKey("precise_adress.precise_adress_id"))

    _user = db.relationship("User", back_populates="_drops")
    _precise_adress = db.relationship("precise_adress",back_populates="_drops")
