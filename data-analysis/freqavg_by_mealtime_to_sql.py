# 광역시도 단위는 area2를 기준으로 계산하는 것으로 수정. mealtime2는 이미 DB에 있으므로 주석처리하였음.
# mealtime2 테이블부터 만들고 싶다면 기존 mealtime2를 지우고, 주석처리한 부분을 해제한 뒤 실행한다.
'''
freqavg_by_mealtime.py가 cursor.execute(insert...)를 사용해서 데이터 프레임의 각 row를 하나씩 DB 넣는다면
freqavg_by_mealtime_to_sql.py는 for문을 사용하지 않고 테이블로 만들고자 하는 데이터프레임을 하나로 모아서 to_sql을 사용해 DB에 저장하였다.
두 코드는 같은 결과를 얻는다.
'''

import sqlite3
import pandas as pd

# Connecting to the geeks database
conn= sqlite3.connect('NaplessRabbit.db')

# Creating a cursor object to execute
# SQL queries on a database table
cursor = conn.cursor()

#광역시도 단위로 점심,저녁,야식시간대별 top3지역을 저장한다. 세종특별자치시는 시군구가 존재하지 않으므로 이곳에만 저장된다.
cursor.execute('''CREATE TABLE freqavg_by_mealtime1 (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               area2 VARCHAR(45) NOT NULL, 
               mealtime VARCHAR(10) NOT NULL, 
               freqavg INT NOT NULL) ''')

# #시군구 단위별로 점심,저녁,야식시간대별 top3지역을 저장한다. (세종특별자치시 미포함)
# cursor.execute('''CREATE TABLE freqavg_by_mealtime2 (
#                id INTEGER PRIMARY KEY AUTOINCREMENT, 
#                area1 VARCHAR(45) NOT NULL, 
#                area2 VARCHAR(45) NOT NULL,
#                area3 VARCHAR(45) NOT NULL, 
#                mealtime VARCHAR(10) NOT NULL, 
#                freqavg INT NOT NULL) ''')

# Opening the csv files
df_2019=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2019_col_name.csv",parse_dates=['날짜'])
df_2020_1=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_1_col_name.csv",parse_dates=['날짜'])
df_2020_2=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_2_col_name.csv",parse_dates=['날짜'])
df_2021=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2021_col_name.csv",parse_dates=['날짜'])

df = pd.concat([df_2019, df_2020_1, df_2020_2, df_2021], ignore_index=True)

peakTime_list = [(11,13, 'launch'), (17,20,'dinner'), (21,23,'night')]
level1_list = list(df['광역시도'].unique())
region_list = df.groupby(['광역시도','시군구']).nunique().reset_index()[['광역시도','시군구']].values

area1_list=[]
'''광역시도 단위'''
for area1 in level1_list:
  #기준이 되는 지역
  region_df = df[df['광역시도']==area1]
  for time in peakTime_list:
    #원하는 시간대만 추출한 뒤 평균 배달건수가 가장 많은 3지역만 얻는다. (3개보다 적을 수 있다.)
    peak_df = region_df[(region_df['시간대']>= time[0]) & (region_df['시간대']<=time[1])]
    # AUTOINCREMENT를 제외하고 컬럼과 테이블의 속성명은 일치해야한다. 컬럼과 같은 이름을 가진 항목으로 값이 저장된다.
    peak_df.rename(columns={'광역시도':'area1','시군구':'area2','배달건수':'freqavg'}, inplace = True)
    
    peak_df = peak_df.groupby(['area1','area2'])['freqavg'].mean().sort_values(ascending=False).reset_index().head(3)
    # 'A value is trying to be set on a copy of a slice from a DataFrame' warining 발생하는데 groupby를 사용해서 loc등을 사용하는 방법을 잘 모르겠다.
    # .copy()를 이용해 해결해야할까?

    peak_df['freqavg'] = peak_df['freqavg'].round()
    peak_df = peak_df.astype({'freqavg':'int'})
    peak_df['mealtime'] = time[2]
    peak_df = peak_df[['area1','area2','mealtime','freqavg']]
    area1_list.append(peak_df)

area1_df = pd.concat(area1_list,ignore_index=True)
# to_sql을 이용해서 이미 있는 테이블에 값만 넣고 싶다면 if_exists=append로 설정한다. 
area1_df.to_sql('freqavg_by_mealtime1', conn, if_exists='append', index=False)

# '''시군구 단위'''
# area2_list=[]
# for area1, area2 in region_list:
#   #세종특별자치시는 전체지역 테이블에 저장
#   if area1 == '세종특별자치시': 
#     continue
  
#   #기준이 되는 지역
#   region_df = df[(df['광역시도']==area1) & (df['시군구'] == area2)]
#   for time in peakTime_list:
#     #원하는 시간대만 추출한 뒤 평균 배달건수가 가장 많은 3지역만 얻는다. (3개보다 적을 수 있다.)
#     peak_df = region_df[(region_df['시간대']>= time[0]) & (region_df['시간대']<=time[1])]
#     # AUTOINCREMENT를 제외하고 컬럼과 테이블의 속성명은 일치해야한다. 컬럼과 같은 이름을 가진 항목으로 값이 저장된다.
#     peak_df.rename(columns={'광역시도':'area1','시군구':'area2','읍면동':'area3','배달건수':'freqavg'}, inplace = True)
   
#     peak_df = peak_df.groupby(['area1','area2', 'area3'])['freqavg'].mean().sort_values(ascending=False).reset_index().head(3)
#      # 'A value is trying to be set on a copy of a slice from a DataFrame' warining 발생하는데 groupby를 사용해서 loc등을 사용하는 방법을 잘 모르겠다.
#     # .copy()를 이용해 해결해야할까?
    
#     peak_df['freqavg'] = peak_df['freqavg'].round()
#     peak_df = peak_df.astype({'freqavg':'int'})
#     peak_df['mealtime'] = time[2]
#     peak_df = peak_df[['area1','area2','area3','mealtime','freqavg']]
#     area2_list.append(peak_df)

# area2_df = pd.concat(area2_list,ignore_index=True)
# area2_df.to_sql('freqavg_by_mealtime2', conn, if_exists='append', index=False)     

#Committing the changes
conn.commit()

#closing the database connection
conn.close()
