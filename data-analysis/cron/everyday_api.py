
import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import datetime as dt

conn= sqlite3.connect('test.db')

cursor = conn.cursor()

# 광역시도 단위
cursor.execute('''CREATE TABLE IF NOT EXISTS restraunt_by_area1 (
               id INTEGER PRIMARY KEY AUTOINCREMENT, 
               area1 VARCHAR(45) NOT NULL, 
               place_name VARCHAR(45) NOT NULL,
               road_address_name VARCHAR(45),
               x FLOAT,
               y FLOAT,
               creation_date date)''')
    
level1_list = [
  "강원도",
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "서울특별시",
  "세종특별자치시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도",
  "제주특별자치도",
  "충청남도",
  "충청북도",
]

#카카오 맛집검색 API            
url = 'https://dapi.kakao.com/v2/local/search/keyword.xml' #address.{format} 요청시 format을 지정하지 않으면 json이 기본이다. 응답은 xml과 json형태를 제공한다.
kakao_header = {'Authorization' : 'KakaoAK 215e6c855eb1a7c49e991aab5a007f8a' }
params ={'query' : ''}

for region in level1_list:
  params['query'] = region + " 맛집" #지역를 바꿔가며 요청을 보낸다.
  now = dt.now()
  response = requests.get(url, headers=kakao_header, params=params)
  soup = BeautifulSoup(response.text, "lxml")
  items = soup.find_all("documents")[:3] 
  for item in items:
    place_name = item.find('place_name').get_text()
    x = item.find('x').get_text()
    y = item.find('y').get_text()
    road_address_name = item.find('road_address_name').get_text()
    creationDate = now.strftime("%Y-%m-%d %H:%M")
    cursor.execute('''INSERT INTO restraunt_by_area1 (area1, place_name, road_address_name, x, y,creation_date) VALUES(?, ?, ?, ?, ?, ?)''', [region, place_name, road_address_name, x, y, creationDate])

    # print(item.find('place_name').get_text())
    # print(item.find('road_address_name').get_text())
    # print(item.find('x').get_text(), item.find('y').get_text())
    # print(creationDate)

#Committing the changes
conn.commit()

#closing the database connection
conn.close()



