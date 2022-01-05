from flask import jsonify
from flask_restx import Resource, Namespace,fields
from models.exception import area1_for_exception as a1, area2_for_exception as a2
from models.map import lon_lat_level1 as l1, lon_lat_level2 as l2, lon_lat_level3 as l3
from ..services.mapService import *
Map = Namespace("map", description="카카오 지도 api를 위한 위도, 경도 얻기")

area = Map.model('Area', {  
    'area1': fields.String(description='area1_City_Do', required=True, example="서울특별시"),
    'area2': fields.String(description='area2_Si_Gun_Gu', required=True, example="강남구")
})


@Map.route('/getGeocode/<string:area1>/<string:area2>')
class getGeocode(Resource):
    @Map.expect(area)
    def get(self, area1, area2):
        '''해당 시군구와 일치하는 시간대별 위도, 경도를 가져옵니다.''' 
        return getGeocode.get(area1,area2)