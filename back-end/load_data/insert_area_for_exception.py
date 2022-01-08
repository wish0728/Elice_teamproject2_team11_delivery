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
df = pd.read_csv('경도_위도_level3.csv')

cur.execute('''CREATE TABLE lon_lat_level3(
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL,
               area2 VARCHAR(45) NOT NULL,
               area3 VARCHAR(45) NOT NULL,  
               longitude FLOAT NOT NULL, 
               latitude FLOAT NOT NULL) ''')
i=0
for row in df.itertuples():
    cur.execute('''INSERT INTO lon_lat_level3 (id, area1, area2, area3, longitude, latitude) VALUES(?, ?, ?, ?, ?, ?)''', 
	[i,row.광역시도,row.시군구,row.읍면동,row.경도,row.위도])
    i+=1
# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cur.execute(select_all).fetchall()
#Committing the changes
conn.commit()

#closing the database con
conn.close()