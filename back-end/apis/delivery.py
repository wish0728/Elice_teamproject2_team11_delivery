from flask import jsonify
from flask_restx import Resource, Namespace
from sqlalchemy.orm import query
from models import deliveryfreq_by_time_area as d
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
<<<<<<< HEAD
import numpy as np 
import pandas as pd 
=======
import numpy as np
import pandas as pd
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
from datetime import date

db = SQLAlchemy()
deliveryfreq = Namespace("delivery", description="deliveryfreq_by_time_area")

# area1_City_Do
<<<<<<< HEAD
=======


>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
@deliveryfreq.route('/getArea1')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class getArea1(Resource): 
    
    '''광역시도 데이터를 가져옵니다.'''
    def get(self):
        rows = db.session.query(d.area1_City_Do).all()
        data=[]
=======
class getArea1(Resource):

    '''광역시도 데이터를 가져옵니다.'''

    def get(self):
        rows = db.session.query(d.area1_City_Do).all()
        data = []
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        for row in rows:
            data.append(row)
        data = list(np.unique(data))
        return jsonify(json_list=data)

<<<<<<< HEAD
#area2_Si_Gun_Gu
=======
# area2_Si_Gun_Gu


>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
@deliveryfreq.route('/getArea2/<string:area1>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class getArea2(Resource): 
    def get(self,area1):
        '''해당 광역시도에 해당하는 시군구 데이터를 가져옵니다.'''
        rows = db.session.query(d.area2_Si_Gun_Gu).filter(d.area1_City_Do==area1).all()
        data=[]
=======
class getArea2(Resource):
    def get(self, area1):
        '''해당 광역시도에 해당하는 시군구 데이터를 가져옵니다.'''
        rows = db.session.query(d.area2_Si_Gun_Gu).filter(
            d.area1_City_Do == area1).all()
        data = []
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        for row in rows:
            data.append(row)
        data = list(np.unique(data))
        return jsonify(json_list=data)

<<<<<<< HEAD
# 시군구 입력 -> 시간대별 평균 
# area1과 area2에 따라 0~23에 해당하는 배달건수 평균값 보내주기 
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기 
=======
# 시군구 입력 -> 시간대별 평균
# area1과 area2에 따라 0~23에 해당하는 배달건수 평균값 보내주기
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기


>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
@deliveryfreq.route('/getFreq/<string:area1>/<string:area2>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class getFreq(Resource): 
    def get(self,area1,area2):
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
        if area2=='전체':
            rows = d.query.filter_by(area1_City_Do=area1).all()   
        else:
            rows = d.query.filter_by(area1_City_Do=area1,area2_Si_Gun_Gu=area2).all()     
        data={}
        a={}
=======
class getFreq(Resource):
    def get(self, area1, area2):
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
        if area2 == '전체':
            rows = d.query.filter_by(area1_City_Do=area1).all()
        else:
            rows = d.query.filter_by(
                area1_City_Do=area1, area2_Si_Gun_Gu=area2).all()
        data = {}
        a = {}
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        for row in rows:
            time = int(row.time)
            freq = int(row.delivery_freq)
            try:
                data[time] += freq
                a[time] += 1
            except KeyError:
                data[time] = freq
                a[time] = 1
        for key in data.keys():
<<<<<<< HEAD
            data[key] /= a[key]
=======
            data[key] = round(data[key]/a[key])
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        return jsonify(json_list=data)


@deliveryfreq.route('/getFreqByYear/<int:year>/<string:area1>/<string:area2>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class getFreq(Resource): 
    def get(self,year,area1,area2):
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
        start = date(year=year,month=1,day=1)
        end = date(year=year,month=12,day=31)
        if area2=='전체':
            rows = d.query.filter(d.date>=start,d.date<=end).filter_by(area1_City_Do=area1).all()   
        else:
            rows = d.query.filter(d.date>=start,d.date<=end).filter_by(area1_City_Do=area1,area2_Si_Gun_Gu=area2).all()     
        data={}
        a={}
=======
<<<<<<< HEAD
class getFreqByYear(Resource): 
    def get(self,year,area1,area2):
=======
class getFreq(Resource):
    def get(self, year, area1, area2):
>>>>>>> 6e68a49be37b061aa65e3ae336e4de97ffe4f488
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
        start = date(year=year, month=1, day=1)
        end = date(year=year, month=12, day=31)
        if area2 == '전체':
            rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
                area1_City_Do=area1).all()
        else:
            rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
                area1_City_Do=area1, area2_Si_Gun_Gu=area2).all()
        data = {}
        a = {}
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        for row in rows:
            time = int(row.time)
            freq = int(row.delivery_freq)
            try:
                data[time] += freq
                a[time] += 1
            except KeyError:
                data[time] = freq
                a[time] = 1
        for key in data.keys():
<<<<<<< HEAD
            data[key] /= a[key]
        return jsonify(json_list=data)

# 시군구 입력 -> 시간대별 총합
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기 
=======
            data[key] = round(data[key]/a[key])
        return jsonify(json_list=data)

# 시군구 입력 -> 시간대별 총합
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기


>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
@deliveryfreq.route('/getSum/<int:year>/<string:area1>/<string:area2>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class getSum(Resource): 
    def get(self,year,area1,area2):
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 총합을 가져옵니다.'''
        start = date(year=year,month=1,day=1)
        end = date(year=year,month=12,day=31)
        if area2=='전체':
            rows = d.query.filter(d.date>=start,d.date<=end).filter_by(area1_City_Do=area1).all()   
        else:
            rows = d.query.filter(d.date>=start,d.date<=end).filter_by(area1_City_Do=area1,area2_Si_Gun_Gu=area2).all()     
        data={}
=======
class getSum(Resource):
    def get(self, year, area1, area2):
        '''해당 연도와 시군구와 일치하는 시간대별 배달건수 총합을 가져옵니다.'''
        start = date(year=year, month=1, day=1)
        end = date(year=year, month=12, day=31)
        if area2 == '전체':
            rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
                area1_City_Do=area1).all()
        else:
            rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
                area1_City_Do=area1, area2_Si_Gun_Gu=area2).all()
        data = {}
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        for row in rows:
            time = int(row.time)
            freq = int(row.delivery_freq)
            try:
                data[time] += freq
            except KeyError:
                data[time] = freq
        return jsonify(json_list=data)


<<<<<<< HEAD
# 보류 
# 시간대별 평균 배달건수 top 3 (2019,2020,2021 다 주기)
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기
# 점심:0, 저녁:1, 야식:2 - 나중에 회의 후 수정 
=======
# 보류
# 시간대별 평균 배달건수 top 3 (2019,2020,2021 다 주기)
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기
# 점심:0, 저녁:1, 야식:2 - 나중에 회의 후 수정
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f

@deliveryfreq.route('/yearTop3/<string:area1>/<string:area2>/<int:peakTime>')
@deliveryfreq.response(200, "Found")
@deliveryfreq.response(404, "Not found")
@deliveryfreq.response(500, "Internal Error")
<<<<<<< HEAD
class yearTop3(Resource): 
    def get(self,area1,area2,peakTime):
        '''2019~2021년에 해당하는 시간대별 top3 동을 가져옵니다. '''
        data={}
        test = d.query.first()
        print(type(test.date.year))
        # years = [2019,2020,2021]        
=======
class yearTop3(Resource):
    def get(self, area1, area2, peakTime):
        '''2019~2021년에 해당하는 시간대별 top3 동을 가져옵니다. '''
        data = {}
        test = d.query.first()
        print(type(test.date.year))
        # years = [2019,2020,2021]
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        # peakTime_list = [(11,13), (17,20), (21,23)] # 점심(11~13) or 저녁(17~20) or 야식(21~23)
        # s = peakTime_list[peakTime][0]
        # e = peakTime_list[peakTime][1]
        # for year in years:
<<<<<<< HEAD
        #     if area2=='전체': 
        #         query  = .filter(d.date.year==year,d.time>=s,d.time<=e).filter_by(area1_City_Do=area1)
        #     else: 
=======
        #     if area2=='전체':
        #         query  = .filter(d.date.year==year,d.time>=s,d.time<=e).filter_by(area1_City_Do=area1)
        #     else:
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
        #         query  = d.query.filter(d.date.year==year,d.time>=s,d.time<=e).filter_by(area1_City_Do=area1,area2_Si_Gun_Gu=area2)
        #     df = pd.read_sql(query.statement, query.session.bind)
        #     print(f'---{year}---')
        #     print(df.groupby('area3_Dong')['delivery_freq'].mean().sort_values(by='delivery_freq',ascending=False).reset_index().head(3))
        return jsonify(json_list=test.date.year)
<<<<<<< HEAD





=======
>>>>>>> cd0ec64aa6502ee1c09906dcb6512a3fcb31978f
