from flask import jsonify
from flask_restx import Resource, Namespace,fields
from . import mapService

Map = Namespace("map", description="카카오 지도 api를 위한 위도, 경도 얻기")
area = Map.model('Area', {  
    'area1': fields.String(description='area1_City_Do', required=True, example="서울특별시"),
    'area2': fields.String(description='area2_Si_Gun_Gu', required=True, example="강남구")
})

@Map.route('/getGeocode/<string:area1>/<string:area2>')
class map(Resource):
    @Map.expect(area)
    def get(self, area1, area2):
        '''해당 시군구와 일치하는 시간대별 위도, 경도를 가져옵니다.''' 
        return mapService.getGeocode(area1,area2)