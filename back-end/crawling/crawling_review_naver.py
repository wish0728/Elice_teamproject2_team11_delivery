from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs
import re 

driver = webdriver.Chrome('./chromedriver')
reviews = {}
x = ['그린횟집', '썬한식', '강릉짬뽕순두부 동화가든 본점']
for keyword in x:

    driver.get(f"https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query={keyword}")
    time.sleep(5)
    js_script = "document.querySelector(\"div.api_subject_bx > div > ul.list_booking_review\").innerHTML"
    time.sleep(2)
    raw = driver.execute_script("return " + js_script)
    html = bs(raw, "html.parser")    
    review_texts = list(data.text for data in html.select("li > div > div.review_txt > div "))
    print(review_texts)
    reviews_dates = list(data.text.split(' ')[0] for data in html.select("li > div > div.reviewer_area > div > span:nth-child(2)"))
    print(reviews_dates)
    reviews[keyword] = list(zip(review_texts,reviews_dates))
print(reviews)






# 크롭 웹페이지를 닫음
driver.close()