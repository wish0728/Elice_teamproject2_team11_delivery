import sqlite3
import pandas as pd
import numpy as np

df= pd.read_csv('../rawdata/holiday/freq_with_holiday.csv',parse_dates=['날짜'])
df = df.drop('Unnamed: 0', axis=1)

df_mapping = pd.DataFrame({
    '요일': ['월', '화', '수', '목', '금', '토','일']
})
sort_mapping = df_mapping.reset_index().set_index('요일')
df['요일정렬'] = df['요일'].map(sort_mapping['index'])

conn = sqlite3.connect("NaplessRabbit.db")
cursor = conn.cursor()

cursor.execute('''CREATE TABLE freqavg_by_day2(
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               area2 VARCHAR(45) NOT NULL, 
               day VARCHAR(1) NOT NULL, 
               freqavg INT NOT NULL) ''')

# cursor.execute(""" SELECT name FROM sqlite_master WHERE type='table' """ )

level1_list = list(df['광역시도'].unique())

for Si_Do in level1_list:
  level2_list = list(df[df['광역시도']==Si_Do]['시군구'].unique())
  for SiGunGu in level2_list:
    #날짜로 그룹핑을 해주어야 하루동안의 총 배달량을 알 수 있다.
    df_dayFreq = df[(df['광역시도'] == Si_Do) &  (df['시군구']==SiGunGu)].groupby(['날짜','요일']).sum().reset_index()
    df_dayFreq = df_dayFreq.groupby('요일').mean().reset_index().sort_values(by='요일정렬')
    for row in df_dayFreq.itertuples():
      # print(Si_Do, SiGunGu, row.요일, int(round(row.배달건수)))
      cursor.execute('''INSERT INTO freqavg_by_day2 (area1,area2, day, freqavg) VALUES(?, ?, ?, ?)''', 
      [Si_Do, SiGunGu, row.요일, int(round(row.배달건수))])
#Committing the changes
conn.commit()

#closing the database connection
conn.close()
