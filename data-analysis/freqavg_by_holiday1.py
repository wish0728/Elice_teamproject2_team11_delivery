import sqlite3
import pandas as pd
import numpy as np

df= pd.read_csv('../rawdata/holiday/freq_with_holiday.csv',parse_dates=['날짜'])
print(df['날짜'])
# df_mapping = pd.DataFrame({
#     '요일': ['월', '화', '수', '목', '금', '토','일']
# })
# sort_mapping = df_mapping.reset_index().set_index('요일')
# print(sort_mapping)
# df['요일정렬'] = df['요일'].map(sort_mapping['index'])
df['날짜'] = pd.to_datetime(df['날짜'],format='%Y-%m-%d')
print(df.head())
conn = sqlite3.connect("test.db")
cursor = conn.cursor()

# cursor.execute('''CREATE TABLE freqavg_by_holiday1(
#                id INTEGER PRIMARY KEY AUTOINCREMENT, 
#                area1 VARCHAR(45) NOT NULL,
#                year INT NOT NULL, 
#                holiday VARCHAR(1) NOT NULL, 
#                freqavg INT NOT NULL) ''')

cursor.execute(""" SELECT name FROM sqlite_master WHERE type='table' """ )

level1_list = list(df['광역시도'].unique())
# level2_list = list(df[df['광역시도']==Si_Do]['시군구'].unique() for Si_Do in level1_list)
print(level1_list)
for Si_Do in level1_list:
  for target_year in [2019, 2020, 2021]:
    df_dayFreq = df[df['날짜'].dt.year==target_year] 
    df_dayFreq = df[(df['광역시도'] == Si_Do)].groupby(['날짜','day_name']).sum().reset_index()
    print(df_dayFreq)
    df_dayFreq = df_dayFreq.groupby('day_name').mean().reset_index()
    print(df_dayFreq)
    # for row in df_dayFreq.itertuples():    
    #   cursor.execute('''INSERT INTO freqavg_by_holiday1 (area1,year,holiday,freqavg) VALUES(?, ?, ?)''', 
    #   [Si_Do, row.요일, int(round(row.배달건수))])
#Committing the changes
conn.commit()

#closing the database connection
conn.close()