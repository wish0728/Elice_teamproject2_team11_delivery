from flask import jsonify
from flask_restx import Resource, Namespace,fields
from models.delivery import area1_for_exception as a1, area2_for_exception as a2
from models.map import lon_lat_level1 as l1, lon_lat_level2 as l2, lon_lat_level3 as l3
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
Map = Namespace("map", description="카카오 지도 api를 위한 위도, 경도 얻기")

area = Map.model('Area', {  
    'area1': fields.String(description='area1_City_Do', required=True, example="서울특별시"),
    'area2': fields.String(description='area2_Si_Gun_Gu', required=True, example="강남구")
})

def exceptionForArea(area1,area2):
    area1_list = [row.area1 for row in a1.query.all()]
    area2_list = ["전체"] + [row.area2 for row in a2.query.filter_by(area1=area1).all()]
    if area1 not in area1_list:
        return {"message":"Unavailable area1"}, 400
    elif area2 not in area2_list:
        return {"message":"Unavailable area2"}, 400
    return 

# area2가 None이 될 수 있게 바꾸기 
# area3도 추가?
@Map.route('/getGeocode/<string:area1>/<string:area2>')
class getGeocode(Resource):
    @Map.expect(area)
    def get(self, area1, area2):
        '''해당 시군구와 일치하는 시간대별 위도, 경도를 가져옵니다.''' 
        if exceptionForArea(area1,area2): return exceptionForArea(area1,area2)
        if area2 == '전체':
            rows = l1.query.filter_by(area1=area1).all()
        else:   
            rows = l2.query.filter_by(area1=area1, area2=area2).all()
        result = [row.as_dict() for row in rows]
        print(result)
        return jsonify(result)