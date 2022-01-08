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


cur.execute("""UPDATE user SET password ='$2b$12$PCuuNZ1tMFXHmUHXCeJNYOt4KuNx7xafQ' WHERE name ='example' """)

# select_all = "SELECT * FROM deliveryfreq_by_time_area LIMIT 5"
# results = cur.execute(select_all).fetchall()

#Committing the changes
conn.commit()

#closing the database con
conn.close()