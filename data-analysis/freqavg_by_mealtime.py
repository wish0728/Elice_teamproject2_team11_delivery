<<<<<<< HEAD
=======
#mealtime1테이블만 수정하고 싶다면 mealtime2와 관련된 테이블은 주석처리 한 뒤 실행한다. 예시는 freqavg_by_mealtime_to_sql.py참고
>>>>>>> feature_data
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
<<<<<<< HEAD
               area3 VARCHAR(45) NOT NULL, 
=======
>>>>>>> feature_data
               mealtime VARCHAR(10) NOT NULL, 
               freqavg INT NOT NULL) ''')

#시군구 단위별로 점심,저녁,야식시간대별 top3지역을 저장한다. (세종특별자치시 미포함)
cursor.execute('''CREATE TABLE freqavg_by_mealtime2 (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               area2 VARCHAR(45) NOT NULL,
               area3 VARCHAR(45) NOT NULL, 
               mealtime VARCHAR(10) NOT NULL, 
               freqavg INT NOT NULL) ''')

# Opening the csv files
df_2019=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2019_col_name.csv",parse_dates=['날짜'])
df_2020_1=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_1_col_name.csv",parse_dates=['날짜'])
df_2020_2=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_2_col_name.csv",parse_dates=['날짜'])
df_2021=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2021_col_name.csv",parse_dates=['날짜'])

df = pd.concat([df_2019, df_2020_1, df_2020_2, df_2021], ignore_index=True)

peakTime_list = [(11,13, 'launch'), (17,20,'dinner'), (21,23,'night')]
level1_list = list(df['광역시도'].unique())
region_list = df.groupby(['광역시도','시군구']).nunique().reset_index()[['광역시도','시군구']].values

'''광역시도 단위'''
for area1 in level1_list:
  #기준이 되는 지역
  region_df = df[df['광역시도']==area1]
  for time in peakTime_list:
    #원하는 시간대만 추출한 뒤 평균 배달건수가 가장 많은 3지역만 얻는다. (3개보다 적을 수 있다.)
    peak_df = region_df[(region_df['시간대']>= time[0]) & (region_df['시간대']<=time[1])]
<<<<<<< HEAD
    peak_df = peak_df.groupby(['광역시도','시군구', '읍면동'])['배달건수'].mean().sort_values(ascending=False).reset_index().head(3)
=======
    peak_df = peak_df.groupby(['광역시도','시군구'])['배달건수'].mean().sort_values(ascending=False).reset_index().head(3)
>>>>>>> feature_data
    peak_df['배달건수'] = peak_df['배달건수'].round()
    peak_df = peak_df.astype({'배달건수':'int'})
    #insert
    for row in peak_df.itertuples():
<<<<<<< HEAD
           cursor.execute('''INSERT INTO freqavg_by_mealtime1 (area1, area2, area3, mealtime, freqavg) VALUES(?, ?, ?, ?, ?)''', 
      [row.광역시도, row.시군구, row.읍면동, time[2], row.배달건수])
=======
           cursor.execute('''INSERT INTO freqavg_by_mealtime1 (area1, area2, mealtime, freqavg) VALUES(?, ?, ?, ?)''', 
      [row.광역시도, row.시군구, time[2], row.배달건수])
>>>>>>> feature_data

'''시군구 단위'''
for area1, area2 in region_list:
  #세종특별자치시는 전체지역 테이블에 저장
  if area1 == '세종특별자치시': 
    continue
  
  #기준이 되는 지역
  region_df = df[(df['광역시도']==area1) & (df['시군구'] == area2)]
  for time in peakTime_list:
    #원하는 시간대만 추출한 뒤 평균 배달건수가 가장 많은 3지역만 얻는다. (3개보다 적을 수 있다.)
    peak_df = region_df[(region_df['시간대']>= time[0]) & (region_df['시간대']<=time[1])]
    peak_df = peak_df.groupby(['광역시도','시군구', '읍면동'])['배달건수'].mean().sort_values(ascending=False).reset_index().head(3)
    peak_df['배달건수'] = peak_df['배달건수'].round()
    peak_df = peak_df.astype({'배달건수':'int'})
    #insert
    for row in peak_df.itertuples():
      cursor.execute('''INSERT INTO freqavg_by_mealtime2 (area1, area2, area3, mealtime, freqavg) VALUES(?, ?, ?, ?, ?)''', 
      [row.광역시도, row.시군구, row.읍면동, time[2], row.배달건수])
       
#Committing the changes
conn.commit()

#closing the database connection
conn.close()