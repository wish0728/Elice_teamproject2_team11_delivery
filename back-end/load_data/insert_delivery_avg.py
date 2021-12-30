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
df = pd.read_csv('freqavg.csv')

for row in df.itertuples():
    cur.execute('''INSERT INTO deliveryfreq_avg_by_time_area2  (area1,area2,time,freqAvg) VALUES(?, ?, ?, ?)''', 
	[row.area1, row.area2, row.time, row.freqAvg])
# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cur.execute(select_all).fetchall()

#Committing the changes
conn.commit()

#closing the database con
conn.close()