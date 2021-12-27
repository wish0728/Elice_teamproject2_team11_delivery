from flask import jsonify
from flask_restx import Resource, Api, Namespace
from models import deliveryfreq_by_time_area
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
deliveryfreq = Namespace("delivery", description="deliveryfreq_by_time_area")

@deliveryfreq.route('/deliveryfreq')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class delivery(Resource): 
    def get(self):
        delivery = db.session.query(deliveryfreq_by_time_area).all()
        res = []
        for i, item in enumerate(delivery):
            res.append(item.as_dict())
        return jsonify({"data": res})
