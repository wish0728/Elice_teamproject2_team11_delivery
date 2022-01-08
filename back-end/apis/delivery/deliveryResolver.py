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




# @Deliveryfreq.route('/getFreqByYear/<int:year>/<string:area1>/<string:area2>')
# class getFreqByYear(Resource): 
#     def get(self,year,area1,area2):
#         '''해당 연도와 지역과 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
#         if exceptionForArea(area1,area2): return exceptionForArea(area1,area2)

#         start = date(year=year, month=1, day=1)
#         end = date(year=year, month=12, day=31)
#         if area2 == '전체':
#             rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
#                 area1_City_Do=area1).all()
#         else:
#             rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
#                 area1_City_Do=area1, area2_Si_Gun_Gu=area2).all()
#         data = {}
#         a = {}
#         for row in rows:
#             time = int(row.time)
#             freq = int(row.delivery_freq)
#             try:
#                 data[time] += freq
#                 a[time] += 1
#             except KeyError:
#                 data[time] = freq
#                 a[time] = 1
#         for key in data.keys():
#             data[key] = round(data[key]/a[key])
#         return jsonify(json_list=data)

