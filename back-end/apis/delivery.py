from flask import jsonify
from flask_restx import Resource, Namespace
from models import deliveryfreq_by_time_area
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import numpy as np 

db = SQLAlchemy()
deliveryfreq = Namespace("delivery", description="deliveryfreq_by_time_area")

# area1_City_Do
@deliveryfreq.route('/getArea1')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getArea1(Resource): 
    def get(self):
        rows = db.session.query(deliveryfreq_by_time_area.area1_City_Do).all()
        data=[]
        for row in rows:
            data.append(row)
        data = list(np.unique(data))
        return jsonify(json_list=data)

#area2_Si_Gun_Gu
@deliveryfreq.route('/getArea2/<string:name>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getArea2(Resource): 
    def get(self,name):
        rows = db.session.query(deliveryfreq_by_time_area.area2_Si_Gun_Gu).filter(deliveryfreq_by_time_area.area1_City_Do==name).all()
        data=[]
        for row in rows:
            data.append(row)
        data = list(np.unique(data))
        return jsonify(json_list=data)

# area1과 area2에 따라 0~23에 해당하는 배달건수 평균값 보내주기 
@deliveryfreq.route('/getFreq/<string:name>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getFreq(Resource): 
    def get(self,name):
        # rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).group_by(deliveryfreq_by_time_area.time).all()
        rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).all()
        data={}
        for row in rows:
            time = int(row[0])
            freq = int(row[1])
            try:
                data[time] += freq
            except KeyError:
                data[time] = freq
        return jsonify(json_list=data)

@deliveryfreq.route('/getFreq1/<string:name>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getFreq(Resource): 
    def get(self,name):
        # rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).group_by(deliveryfreq_by_time_area.time).all()
        rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).all()
        data={}
        name={}
        for row in rows:
            time = int(row[0])
            freq = int(row[1])
            try:
                data[time] += freq
                name[time] += 1
            except KeyError:
                data[time] = freq
                name[time] = 1
        for key in data.keys():
            data[key] /= name[key]
        return jsonify(json_list=name)
@deliveryfreq.route('/getFreq2/<string:name>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getFreq(Resource): 
    def get(self,name):
        # rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).group_by(deliveryfreq_by_time_area.time).all()
        rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).all()
        data={}
        name={}
        for row in rows:
            time = int(row[0])
            freq = int(row[1])
            try:
                data[time] += freq
                name[time] += 1
            except KeyError:
                data[time] = freq
                name[time] = 1
        for key in data.keys():
            data[key] /= name[key]
        return jsonify(json_list=data)

@deliveryfreq.route('/getFreq3/<string:name>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
class getFreq(Resource): 
    def get(self,name):
        # rows = db.session.query(deliveryfreq_by_time_area.time,deliveryfreq_by_time_area.delivery_freq).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).group_by(deliveryfreq_by_time_area.time).all()
        rows = db.session.query(deliveryfreq_by_time_area.time,func.avg(deliveryfreq_by_time_area.delivery_freq)).filter(deliveryfreq_by_time_area.area2_Si_Gun_Gu==name).all()
        data={}
        name={}
        for row in rows:
            time = row[0]
            freq = int(row[1])
            data[time] = freq
            # try:
            #     data[time] += freq
            # except KeyError:
            #     data[time] = freq
        return jsonify(json_list=data)

