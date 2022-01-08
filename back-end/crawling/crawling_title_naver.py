from os import X_OK
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs
import sqlite3
from datetime import datetime as dt  

# db 업데이트 끝나면 db 교체하기
# 오류일어나면 로그시스템에 기록하자
now = dt.now()
print(f'현재시간 : {now}')
# creationDate = now.strftime("%Y/%m/%d %H:00")
creationDate = now.strftime("%Y/%m/%d %H:%M")
print(creationDate)
conn = sqlite3.connect("../NaplessRabbit.db")
cursor = conn.cursor()
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS reviews_by_area1(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    area1 VARCHAR(45) NOT NULL,
    title VARCHAR(45) NOT NULL,
    review_text VARCHAR(500) NOT NULL,
    review_date VARCHAR(45) NOT NULL,
    creation_date VARCHAR(45) NOT NULL) ''')
cursor.execute(""" SELECT name FROM sqlite_master WHERE type='table' """ )
start = time.time()
driver = webdriver.Chrome('./chromedriver') 
# level1_list = [
#   "강원도",
#   "경기도",
#   "경상남도",
#   "경상북도",
#   "광주광역시",
#   "대구광역시",
#   "대전광역시",
#   "부산광역시",
#   "서울특별시",
#   "세종특별자치시",
#   "울산광역시",
#   "인천광역시",
#   "전라남도",
#   "전라북도",
#   "제주특별자치도",
#   "충청남도",
#   "충청북도",
# ]; 
level1_list = [
    "강원도",
    "경기도",
]
url = "https://search.naver.com/search.naver" # 사이트 입력

for Si_Do in level1_list:
    driver.get(f'{url}?query={Si_Do}+맛집') # 사이트 오픈
    time.sleep(2) # 2초 지연
    js_script = "document.querySelector(\"div.place_section_content > ul\").innerHTML"
    raw = driver.execute_script("return " + js_script)
    html = bs(raw, "html.parser")
    contents = html.select("li > div > a > div:nth-child(1) > div > span:nth-child(1)")
    titles = []
    for s in contents:
        titles.append(s.text)
    print(titles)
    titles = titles[2:] # 상단 광고 2개 거르기 
    reviews = {}
    i=0
    for title in titles:
        if i==2: break 
        driver.get(f"https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query={title}")
        time.sleep(3)
        js_script = "document.querySelector(\"div.api_subject_bx > div > ul.list_booking_review\").innerHTML"
        try:
            raw = driver.execute_script("return " + js_script)
            i+=1
        except Exception as e:
            # 오류일어나면 로그시스템에 기록 - 코드 변경 필요 
            print(f'오류기록:{e}')
            continue 
        html = bs(raw, "html.parser")    
        review_texts = list(data.text.replace('\n','') for data in html.select("li > div > div.review_txt > div "))
        reviews_dates = list(data.text.split(' ')[0] for data in html.select("li > div > div.reviewer_area > div > span:nth-child(2)"))
        reviews[title] = list(zip(review_texts,reviews_dates))
    print(reviews)
    for key, value in reviews.items():
        print(key)
        for x in value:
            print(x[0],x[1])
            cursor.execute('''INSERT INTO reviews_by_area1 (area1,title,review_text,review_date,creation_date) VALUES(?, ?, ?, ?, ?)''', 
            [Si_Do, key, x[0], x[1], creationDate])
sql = "DELETE FROM `reviews_by_area1` WHERE creation_date != ?"
cursor.execute(sql, (creationDate,))

conn.commit()
conn.close()
       
driver.close()
print(f'걸린 시간 : {time.time()-start}')



# 크롭 웹페이지를 닫음
