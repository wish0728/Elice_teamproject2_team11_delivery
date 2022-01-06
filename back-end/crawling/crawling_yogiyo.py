from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs

driver = webdriver.Chrome('./chromedriver') 
url = "https://www.yogiyo.co.kr/" # 사이트 입력
driver.get(url) # 사이트 오픈
driver.maximize_window() # 전체장
time.sleep(2) # 2초 지연

# 검색창 선택
xpath = '''//*[@id="search"]/div/form/input'''  # 검색창
element = driver.find_element_by_xpath(xpath)
element.clear()
time.sleep(2)

# 검색창 입력
value = input("지역을 입력하세요")
element.send_keys(value)
time.sleep(2)

# 조회버튼 클릭
search_xpath = '''//*[@id="button_search_address"]/button[2]'''
driver.find_element_by_xpath(search_xpath).click()

# 크롭 웹페이지를 닫음
# driver.close()