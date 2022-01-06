from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs

driver = webdriver.Chrome('./chromedriver') 
 
url = "https://www.naver.com/" # 사이트 입력
driver.get(url) # 사이트 오픈
time.sleep(2) # 2초 지연

# 검색창에 검색어 입력하기
elem = driver.find_element_by_id('query') 
elem.send_keys('강원도 맛집')
elem = driver.find_element_by_class_name('btn_submit') 
elem.click()

js_script = "document.querySelector(\"div.place_section_content > ul\").innerHTML"

# for p in range(5):
time.sleep(2)
raw = driver.execute_script("return " + js_script)

html = bs(raw, "html.parser")
contents = html.select("li > div > a > div:nth-child(1) > div > span:nth-child(1)")
print(contents)

x = []
for s in contents:
    x.append(s.text)
print(x)
time.sleep(3)






# 크롭 웹페이지를 닫음
driver.close()