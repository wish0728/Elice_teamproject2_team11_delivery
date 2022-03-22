import sqlite3
import pandas as pd
import numpy as np

df= pd.read_csv('../cleaned_data/delivery_corona.csv')

print(df.head())
conn = sqlite3.connect("NaplessRabbit.db")
cursor = conn.cursor()

# cursor.execute('''CREATE TABLE delta_sum_by_area1(
#                id INTEGER PRIMARY KEY AUTOINCREMENT,
#                year_month VARCHAR(45) NOT NULL, 
#                area1 VARCHAR(45) NOT NULL,delta INT NOT NULL,
#                sum INT NOT NULL) ''')

cursor.execute(""" SELECT name FROM sqlite_master WHERE type='table' """ )
local_dictionary = {'강원도':'강원', '경기도':'경기', '경상남도':'경남', '경상북도':'경북', '광주광역시':'광주', '대구광역시':'대구', 
                    '대전광역시':'대전', '부산광역시':'부산','서울특별시':'서울', '세종특별자치시':'세종', '울산광역시':'울산', 
                    '인천광역시':'인천', '전라남도':'전남', '전라북도':'전북', '제주특별자치도':'제주', '충청남도':'충남', '충청북도':'충북'}
reverse_dict = dict(map(reversed,local_dictionary.items()))
print(reverse_dict)
def change_areaname(row, value):
    return value[row]
  
df['지역'] = df['지역'].apply(change_areaname, args=(reverse_dict, ))

# delivery_by_month.drop('광역시도', axis=1, inplace=True)
level1_list = list(df['지역'].unique())
# level2_list = list(df[df['광역시도']==Si_Do]['시군구'].unique() for Si_Do in level1_list)
print(level1_list)

for Si_Do in level1_list:
  df_sum = df[df['지역']==Si_Do]
  for row in df_sum.itertuples():    
    cursor.execute('''INSERT INTO delta_sum_by_area1 (area1, year_month, delta, sum) VALUES(?, ?, ?, ?)''', 
    [Si_Do,  row.year_month, row.전일대비증감수, row.배달건수])
# Committing the changes
conn.commit()

#closing the database connection
conn.close()
