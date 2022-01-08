from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup as bs
import re 

driver = webdriver.Chrome('./chromedriver')
reviews = {}
x = ['그린횟집', '썬한식', '강릉짬뽕순두부 동화가든 본점']
for keyword in x:

    driver.get(f"https://www.google.com/maps/place/{keyword}")
    time.sleep(5)
    js_script = "document.querySelector(\"div#pane > div > div.Yr7JMd-pane-content.cYB2Ge-oHo7ed > div > div > div:nth-child(38) > div > div.ODSEW-ShBeI-content > div:nth-child(3)\").innerHTML"
    time.sleep(2)
    raw = driver.execute_script("return " + js_script)
    html = bs(raw, "html.parser")    
    
print(reviews)






# 크롭 웹페이지를 닫음
driver.close()