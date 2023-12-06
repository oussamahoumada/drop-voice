from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import precise_adress
from ..models.location.precise_adress_api_model import precise_adress_model, precise_adress_input_model

loactionNs = Namespace("location/")

@loactionNs.route("/PreciseAdress")
class precise_adressAPI(Resource):
    @loactionNs.marshal_list_with(precise_adress_model)
    def get(self):
        return precise_adress.query.all()

    @loactionNs.expect(precise_adress_input_model)
    @loactionNs.marshal_with(precise_adress_model)
    def post(self):
        newPreciseAdress = precise_adress(
            longitude = loactionNs.payload['longitude'],
            latitude = loactionNs.payload['latitude'],
        )
        db.session.add(newPreciseAdress)
        db.session.commit()

        return newPreciseAdress

    '''
    @loactionNs.expect(adress_input_model)
    @loactionNs.marshal_with(adress_model)
    def post(self):
        newAdress = adress(
            location = loactionNs.payload['location']
        )
        req = adress.query.filter(adress.location == newAdress.location)
        
        if(req.all() == []):
            print(newAdress)
            db.session.add(newAdress)
            db.session.commit()
            return newAdress
        
        else:
            return{"message":"already exist"}
    '''