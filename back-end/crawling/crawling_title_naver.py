from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs
import sqlite3
import pandas as pd
import re 

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

driver = webdriver.Chrome('./chromedriver') 
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
]; 

url = "https://search.naver.com/search.naver" # 사이트 입력

# 검색창에 검색어 입력하기
for Si_Do in level1_list:
    driver.get(f'{url}?query={Si_Do}+맛집') # 사이트 오픈
    time.sleep(2) # 2초 지연
    js_script = "document.querySelector(\"div.place_section_content > ul\").innerHTML"
# for p in range(5):
    raw = driver.execute_script("return " + js_script)
    html = bs(raw, "html.parser")
    contents = html.select("li > div > a > div:nth-child(1) > div > span:nth-child(1)")
    titles = []
    for s in contents:
        titles.append(s.text)
    print(titles)
    reviews = []
    # for title in titles:
       
driver.close()




# 크롭 웹페이지를 닫음
