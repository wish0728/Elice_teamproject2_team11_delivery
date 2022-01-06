from flask_restx import Resource, Namespace,fields
# from services.deliveryService import getFreq, getFreqByDay
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
        '''해당 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.''' 
        return deliveryService.getFreq(area1,area2)

@Deliveryfreq.route('/getFreqByDay/<string:area1>/<string:area2>')
class getFreqByDay(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 시군구와 일치하는 요일별 배달건수 평균을 가져옵니다.''' 
        return deliveryService.getFreqByDay(area1,area2)

@Deliveryfreq.route('/getFreqByMealtime/<string:area1>/<string:area2>')
class getFreqByMealtime(Resource):
    @Deliveryfreq.expect(area)
    def get(self, area1, area2):
        '''해당 시군구와 일치하는 점심(11-13), 저녁(17-20), 야식(21-23)에 해당하는 배달건수 Top3를 가져옵니다.''' 
        return deliveryService.getFreqByMealtime(area1,area2)

# @Deliveryfreq.route('/getFreqByYear/<int:year>/<string:area1>/<string:area2>')
# class getFreqByYear(Resource): 
#     def get(self,year,area1,area2):
#         '''해당 연도와 시군구와 일치하는 시간대별 배달건수 평균을 가져옵니다.'''
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

# 시군구 입력 -> 시간대별 총합
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기


# @Deliveryfreq.route('/getSum/<int:year>/<string:area1>/<string:area2>')
# class getSum(Resource):
#     def get(self, year, area1, area2):
#         if exceptionForArea(area1,area2): return exceptionForArea(area1,area2)
            
#         '''해당 연도와 시군구와 일치하는 시간대별 배달건수 총합을 가져옵니다.'''
#         start = date(year=year, month=1, day=1)
#         end = date(year=year, month=12, day=31)
#         if area2 == '전체':
#             rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
#                 area1_City_Do=area1).all()
#         else:
#             rows = d.query.filter(d.date >= start, d.date <= end).filter_by(
#                 area1_City_Do=area1, area2_Si_Gun_Gu=area2).all()
#         data = {}
#         for row in rows:
#             time = int(row.time)
#             freq = int(row.delivery_freq)
#             try:
#                 data[time] += freq
#             except KeyError:
#                 data[time] = freq
#         return jsonify(json_list=data)


# 보류
# 시간대별 평균 배달건수 top 3 (2019,2020,2021 다 주기)
# 시군구 전체 데이터를 보고 싶으면 area2에 '전체'를 보내주기
# 점심:0, 저녁:1, 야식:2 - 나중에 회의 후 수정

# @Deliveryfreq.route('/yearTop3/<string:area1>/<string:area2>/<int:peakTime>')
# @Deliveryfreq.response(200, "Found")
# @Deliveryfreq.response(404, "Not found")
# @Deliveryfreq.response(500, "Internal Error")
# class yearTop3(Resource):
#     def get(self, area1, area2, peakTime):
#         '''2019~2021년에 해당하는 시간대별 top3 동을 가져옵니다. '''
#         data = {}
#         test = d.query.first()
#         print(type(test.date.year))
#         # years = [2019,2020,2021]
#         # peakTime_list = [(11,13), (17,20), (21,23)] # 점심(11~13) or 저녁(17~20) or 야식(21~23)
#         # s = peakTime_list[peakTime][0]
#         # e = peakTime_list[peakTime][1]
#         # for year in years:
#         #     if area2=='전체':
#         #         query  = .filter(d.date.year==year,d.time>=s,d.time<=e).filter_by(area1_City_Do=area1)
#         #     else:
#         #         query  = d.query.filter(d.date.year==year,d.time>=s,d.time<=e).filter_by(area1_City_Do=area1,area2_Si_Gun_Gu=area2)
#         #     df = pd.read_sql(query.statement, query.session.bind)
#         #     print(f'---{year}---')
#         #     print(df.groupby('area3_Dong')['delivery_freq'].mean().sort_values(by='delivery_freq',ascending=False).reset_index().head(3))
#         return jsonify(json_list=test.date.year)
