import sqlite3
import pandas as pd

# Connecting to the database
conn= sqlite3.connect('NaplessRabbit.db')

# Creating a cursor object to execute
# SQL queries on a database table
cursor = conn.cursor()

# 광역시도 단위
cursor.execute('''CREATE TABLE freqavg_by_weather1 (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               normal FLOAT, 
               rain FLOAT,
               snow FLOAT,
               hot FLOAT,
               cold FLOAT) ''')

# 시군구 단위 (세종특별자치시 미포함)
cursor.execute('''CREATE TABLE freqavg_by_weather2 (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               area2 VARCHAR(45) NOT NULL, 
               normal FLOAT, 
               rain FLOAT,
               snow FLOAT,
               hot FLOAT,
               cold FLOAT) ''')

# Opening the csv files
area1_df =pd.read_csv("../rawdata/날씨별평균배달건수/시군구_날씨별_평균배달_최종_area1.csv")
area2_df=pd.read_csv("../rawdata/날씨별평균배달건수/시군구_날씨별_평균배달_최종.csv")

area1_df.rename(columns={'광역시도':'area1'}, inplace = True)
area2_df.rename(columns={'광역시도':'area1','시군구':'area2'}, inplace = True)

# print(area1_df.head())
# print(area2_df.head())


# to_sql을 이용해서 이미 있는 테이블에 값만 넣고 싶다면 if_exists=append로 설정한다. 
area1_df.to_sql('freqavg_by_weather1', conn, if_exists='append', index=False)
area2_df.to_sql('freqavg_by_weather2', conn, if_exists='append', index=False)


#Committing the changes
conn.commit()

#closing the database connection
conn.close()
