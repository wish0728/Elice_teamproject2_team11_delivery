from flask_restx import Resource, Namespace,fields
from . import deliveryService
Deliveryfreq = Namespace("delivery", description="배달 관련 api")

area = Deliveryfreq.model('Area', { 
    'area1': fields.String(description='area1_City_Do', required=True, example="서울특별시"),
    'area2': fields.String(description='area2_Si_Gun_Gu', required=True, example="강남구")
})


# 시군구 입력 -> 시간대별 평균
# area1과 area2에 따라 0~23에 해당하는 배달건수 평균값 보내주기
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기
@Deliveryfreq.route('/getFreq/<string:area1>/<string:area2>')
class getFreq(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 지역과 일치하는 시간대별 배달건수 평균을 가져옵니다.''' 
        return deliveryService.getFreq(area1,area2)

@Deliveryfreq.route('/getFreqByDay/<string:area1>/<string:area2>')
class getFreqByDay(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 지역과 일치하는 요일별 배달건수 평균을 가져옵니다.''' 
        return deliveryService.getFreqByDay(area1,area2)

@Deliveryfreq.route('/getFreqByMealtime/<string:area1>/<string:area2>')
class getFreqByMealtime(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 지역과 일치하는 점심(11-13), 저녁(17-20), 야식(21-23)에 해당하는 배달건수 Top3를 가져옵니다.''' 
        return deliveryService.getFreqByMealtime(area1,area2)


@Deliveryfreq.route('/getFreqByHoliday/<string:area1>/<string:area2>')
class getFreqByHoliday(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 지역과 일치하는 공휴일 평균 배달건수를 가져옵니다.''' 
        return deliveryService.getFreqByHoliday(area1,area2)

@Deliveryfreq.route('/getDeltaSum/<string:area1>')
class getDeltaSum(Resource):
    def get(self, area1):
        '''해당 지역에 일치하는 총배달건수합, 전달대비 코로나 확진자 증감수를 가져옵니다.(2019.08~2021.08)''' 
        return deliveryService.getDeltaSum(area1)

@Deliveryfreq.route('/getFreqByWeather/<string:area1>/<string:area2>')
class getFreqByWeather(Resource):
    def get(self, area1, area2):
        '''해당 지역에 일치하는 날씨별 배달건수 평균을 가져옵니다''' 
        return deliveryService.getFreqByWeather(area1,area2)





