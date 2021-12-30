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
df = pd.read_csv('area2_for_exception.csv')

i=1
for row in df.itertuples():
    cur.execute('''INSERT INTO area2_for_exception (id,area1,area2) VALUES(?, ?, ?)''', 
	[i,row.area1,row.area2])
    i+=1
# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cur.execute(select_all).fetchall()

#Committing the changes
conn.commit()

#closing the database con
conn.close()