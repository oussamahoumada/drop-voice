import os
import base64
from flask_restx import Resource, Namespace
from sqlalchemy import and_, delete

from ..extensions import db
from ..models.models import drop, precise_adress
from ..services.cloud_storage import add_to_dropbox, get_image_url
from ..models.drop.drop_api_model import drop_input_model, get_all_drop_model, drop_delete_model
from ..models.models import User

drop_ns = Namespace("drop/")

@drop_ns.route("/add_drop")
class DropAPI(Resource):   
    @drop_ns.expect(drop_input_model)
    def post(self):
        image = drop_ns.payload['image']
        image_url = drop_ns.payload['image_url']

        audio = drop_ns.payload['audio']
        audio_url = drop_ns.payload['audio_url']

        long = drop_ns.payload['longitude']
        lat = drop_ns.payload['latitude']

        upload(image, image_url)
        upload(audio, audio_url)
        
        new_address = precise_adress(
            longitude = long,
            latitude = lat
        )
        req = precise_adress.query.filter(and_(precise_adress.longitude==long, precise_adress.latitude==lat))
        
        if(req.all() == []):
            db.session.add(new_address)
            db.session.commit()
            req = precise_adress.query.filter(and_(precise_adress.longitude==long, precise_adress.latitude==lat))
        
        pa_id = req.first().precise_adress_id
        
        image_url_from_dp = get_image_url(image_url)
        audio_url_from_dp = get_image_url(audio_url)

        dr = drop(
            title = drop_ns.payload['title'],
            image_url = image_url_from_dp,
            audio_url = audio_url_from_dp,
            date = drop_ns.payload['date'],
            ref_precise_adress = pa_id,
            ref_user = drop_ns.payload['ref_user'],
            ref_theme = drop_ns.payload['theme'],
        )
        db.session.add(dr)
        db.session.commit()

        return "success", 200
    
@drop_ns.route("/delete_drop/<int:id>")
class DropAPI(Resource): 
    def delete(self,id):
        drop_del = delete(drop).where(drop.drop_id==id)
        db.session.execute(drop_del)
        db.session.commit()

        return "success", 200


@drop_ns.route("/get_all_drops")
class DropAPI(Resource):
    @drop_ns.marshal_list_with(get_all_drop_model)
    def get(self):
        return drop.query.all()

@drop_ns.route("/user/<int:user_id>")
class DropAPI(Resource):
    @drop_ns.marshal_list_with(get_all_drop_model)
    def get(self, user_id) -> drop:
        user: User = User.query.get(user_id)

        return drop.query.filter_by(_user=user).all()

def upload(file, name):
    _, encoded_data = file.split(',', 1)
    decoded_data = base64.b64decode(encoded_data)

    filepath = os.path.join("./", name)
    with open(filepath, 'wb') as file:
        file.write(decoded_data)

    print(filepath)
    add_to_dropbox(filepath,name)

    if os.path.exists(filepath):
       os.remove(filepath)
