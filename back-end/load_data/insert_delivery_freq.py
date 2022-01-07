#python3로 실행
import sqlite3
import pandas as pd

# Connecting to the geeks database
# connection = sqlite3.connect('../NaplessRabbit.db')
connection = sqlite3.connect('NaplessRabbit.db')

# Creating a cursor object to execute
# SQL queries on a database table
cursor = connection.cursor()

<<<<<<< HEAD:back-end/load_data/insert_delivery_freq.py
# Opening the Books_info.csv file
# df_2019=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2019_col_name.csv")
# df_2020_1=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_1_col_name.csv", encoding = 'cp949')
# df_2020_2=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_2_col_name.csv")
# df_2021=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2021_col_name.csv", encoding = 'cp949')

df_2019=pd.read_csv("elicer_2019_col_name.csv")
df_2020_1=pd.read_csv("elicer_2020_1_col_name.csv")
df_2020_2=pd.read_csv("elicer_2020_2_col_name.csv")
df_2021=pd.read_csv("elicer_2021_col_name.csv")
=======
# Opening csv files
df_2019=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2019_col_name.csv",parse_dates=['날짜'])
df_2020_1=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_1_col_name.csv",parse_dates=['날짜'])
df_2020_2=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2020_2_col_name.csv",parse_dates=['날짜'])
df_2021=pd.read_csv("../rawdata/시간-지역별배달주문건수/elicer_2021_col_name.csv",parse_dates=['날짜'])
>>>>>>> feature_data:data-analysis/insert_delivery_freq.py

df = pd.concat([df_2019, df_2020_1, df_2020_2, df_2021], ignore_index=True)

for row in df.itertuples():
	cursor.execute('''INSERT INTO deliveryfreq_by_time_area (date, time, delivery_freq
	, area1_City_Do, area2_Si_Gun_Gu, area3_Dong) VALUES(?, ?, ?, ?, ?, ?)''', 
	[row.날짜, row.시간대, row.배달건수, row.광역시도, row.시군구, row.읍면동])

# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cursor.execute(select_all).fetchall()

#Committing the changes
connection.commit()

#closing the database connection
connection.close()