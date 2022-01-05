from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs
import re 

driver = webdriver.Chrome('./chromedriver') 
#크롬 드라이버에 url 주소 넣고 실행
x = ['그린횟집', '썬한식', '강릉짬뽕순두부 동화가든 본점']
for keyword in x:
    driver.get(f"https://map.naver.com/v5/search/{keyword}/place")
    time.sleep(5)
    cu = driver.current_url
    print(cu)
    res_code = re.findall(r"place/(\d+)", cu)
    print(f'res_code:{res_code}')
    final_url = 'https://pcmap.place.naver.com/restaurant/'+res_code[0]+'/review/visitor#'
        
    print(final_url)




# 크롭 웹페이지를 닫음
driver.close()