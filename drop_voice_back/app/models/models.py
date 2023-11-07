from ..extensions import db 

class user(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    mail = db.Column(db.String(250))

class drop(db.Model):
    drop_id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(250))
    audio_url = db.Column(db.String(250))
    title = db.Column(db.String(250))
    type = db.Column(db.String(250))

class theme(db.Model):
    drop_id = db.Column(db.Integer, primary_key=True)
    libelle = db.Column(db.String(250))

class adress(db.Model):
    drop_id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(250))

class drop_theme(db.Model):
    drop_theme_id = db.Column(db.Integer, primary_key=True)

    