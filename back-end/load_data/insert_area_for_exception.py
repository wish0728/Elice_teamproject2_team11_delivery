#python3로 실행
import sqlite3
import pandas as pd
import csv 

# Connecting to the geeks database
conn = sqlite3.connect('NaplessRabbit.db')

# Creating a cursor object to execute
# SQL queries on a database table
cur = conn.cursor()

# Opening the Books_info.csv file
df = pd.read_csv('시간지역별배달주문건수_요일포함.csv')


for row in df.itertuples():
    cur.execute('''INSERT INTO deliveryfreq_including_dayweek (id, date, time, delivery_freq
	, area1_City_Do, area2_Si_Gun_Gu, area3_Dong, dayweek) VALUES(?, ?, ?, ?, ?, ?, ?, ?)''', 
	[row.번호,row.날짜,row.시간대,row.배달건수,row.광역시도,row.시군구,row.읍면동,row.요일])

# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cur.execute(select_all).fetchall()
#Committing the changes
conn.commit()

#closing the database con
conn.close()