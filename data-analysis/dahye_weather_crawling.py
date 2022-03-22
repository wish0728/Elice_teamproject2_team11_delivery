'''
코드 참고 출처 : https://ducj.tistory.com/226
ubuntu 18.04에서 실행, 크롬드라이버 버전 95
vscode에서 python3로 실행
'''

import os
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import threading 
from selenium.webdriver.support.ui import Select
import random

#드라이버를 실행할 수 있는 권한을 준다.
os.chmod('/home/dahye/Downloads/chromedriver', 755)

class KMA:
    def __init__(self,driver_path=r'/home/dahye/Downloads/chromedriver', #chromedriver의 경로
    	  download_path=r'/home/dahye/weathers',options = Options(),time=5): #크롬에서의 자동 다운로드 경로
        self.down_dir=download_path
        self.driv_path=driver_path
        self.options=options
        options.add_experimental_option("prefs", {
            "download.default_directory": self.down_dir})
        self.time=time
        self.thread=threading.Timer(time,self.auto_login)

    # 기상자료개방포털 홈페이지로 이동    
    def setting(self): 
        try:
            self.driver.quit()
        except:
            print("setting")
        self.driver= webdriver.Chrome(self.driv_path, options=self.options)
        # self.driver.get('https://data.kma.go.kr/cmmn/main.do') #기상자료 개방포털 도메인

    # login을 수행하며, 성공하면 True를 반환    
    def login(self,kma_id,kma_pass):
        try:
            self.driver.maximize_window()
            self.driver.find_element_by_css_selector('a#loginBtn').click()
            self.driver.find_element_by_css_selector('input#loginId.inp').send_keys(kma_id)
            self.driver.find_element_by_css_selector('input#passwordNo.inp').send_keys(kma_pass)
            self.driver.find_element_by_css_selector('button#loginbtn.btn_login').click()
            print("login성공")
            return True
        except:
            print('이미 로그인 중입니다.')
            return False
    
    # logout을 수행하며, 성공하면 True를 반환
    def logout(self):
        try:
            self.driver.maximize_window()
            self.driver.find_element_by_css_selector('a#logoutBtn').click()
            return True
        except:
            print('이미 로그아웃 되어있습니다.')
            return False
    
    # close와 quit함수는 인터넷창을 닫는다.
    def close(self):
        self.driver.close()
    def quit(self):
        self.driver.quit()
    
    # login, logout 을 매번 수행하기 귀찮으므로 login_loof함수를 사용하게 되면 다시 로그인을 수행
    def login_loof(self,kma_id,kma_pass):
        self.logout()
        self.login(kma_id,kma_pass)
            
    def auto_login(self,kma_id,kma_pass):
        self.login_loof(kma_id,kma_pass)
        self.thread=threading.Timer(self.time,self.auto_login)
        self.thread.start()

    def start(self):
        self.thread.start()

    def cancel(self):
        self.thread.cancel()
    
    #이제 여기서 어떻게 next를 개수만큼 누르면서 계속 다운로드를 누르고 가져오지? 
    #참고 https://steadiness-193.tistory.com/118
    def move_next(self):
        '''페이지바 찾기'''
        page_bar = self.driver.find_elements_by_class_name('wrap_paging')[0] #find_elements_by_class_name의 리턴값은 리스트 형태이므로 첫번째 아이템을 가져와야한다.
        
        '''페이지바를 이용해 페이지들 찾기'''
        # 현재 위치하고 있는 곳은 a태그에서 제외된다!
        pages = page_bar.find_elements_by_css_selector('a')
        
        '''현재페이지 찾기'''
        page_now = page_bar.find_elements_by_class_name('on')[0].text 
        for page in pages:
            page_num = page.text.strip()
            #처음 페이지,이전 페이지,2,3,4,5,6,7,8,9,10,다음 페이지,끝 페이지
            if page_num in ['처음 페이지', '이전 페이지', '끝 페이지']:
                pass
            elif page_num == '다음 페이지': #10페이지가 끝나면 다음 눌러서 11페이지로 가기
                page.send_keys('\n')
                #페이지 객체는 셀레늄의 send_keys('\n')으로 엔터를 입력해 페이지를 넘기는데 이용한다.
                self.driver.implicitly_wait(3)
                sleep(1)
                #일정시간동안 쉬고 반복적으로 접근하는 것을 차단해놓은 곳도 있으므로 랜덤하게 쉬어주는것도 방법
                # sleep(2+random.uniform(0,1)) 
                return False
            elif int(page_num) > int(page_now): #다음페이지로 넘어가기
                print("다음페이지 넘기기", page_num)
                page.send_keys('\n')
                self.driver.implicitly_wait(3)
                sleep(1)
                return False
        #지금 여기가 실행이 안된다. 마지막 페이지로 간 다음에 '선택된 자료가 없습니다!'라는 메시지가 뜬 뒤 종료된다.
        print('끝 페이지')
        return True
        
    #  자료를 다운로드 받는 함수
    def download(self,subTree_list,kma_id, kma_pass):
        """ 사이트 이동 및 로그인"""
        try:   
            self.driver.get(f'https://data.kma.go.kr/data/rmt/rmtList.do?code=400&pgmNo=')
            A.login(kma_id, kma_pass)
        except:
            print('동네예보 > 초단기실황 접근 실패')
        
        """ 변수 선택 """
        #지역 기본세팅인 서울>청운효자동을 전체 클릭해서 선택해제
        self.driver.find_element_by_id('ztree_1_check').click()
        #초단기실황의 경우 데이터 양이 많아 전체지역을 선택하면 데이터가 안들어온다; 따라서 최대 3개의 시도별로 조회한다.
        for i in range(len(subTree_list)):
            self.driver.find_element_by_id(subTree_list[i]).click() #지역선택
        self.driver.find_element_by_id('ztree1_5_check').click() #강수
        self.driver.find_element_by_id('ztree1_7_check').click() #기온

        #검색기간 최대 12개월  
        # (1) 2019.08~2020.07 / (2) 2020.08 ~ 2021-07 / (3) 2021.08~2021.08
        """ 시작 기간 설정 """ 
        Select(self.driver.find_element_by_id('startDt')).select_by_visible_text('2021')
        Select(self.driver.find_element_by_id('startMt')).select_by_visible_text('08')
         
        """ 끝 기간 설정 """
        Select(self.driver.find_element_by_id('endDt')).select_by_visible_text('2021')
        Select(self.driver.find_element_by_id('endMt')).select_by_visible_text('08')
          
        """ 조회 """
        self.driver.execute_script("searchData('btn');")
        sleep(1)
          
        """ 다운로드 """
        self.driver.find_element_by_id('checkAll').click() 
        self.driver.execute_script('parameterSettingAndOrder();')
        sleep(1)
        
        #용도신청 팝업선택
        try: 
            sleep(0.5) #sleep이 없으면 로그인 후 팝업이 바로 뜨지 않아 에러가 난다
            self.driver.find_element_by_css_selector('div#divPopupTemp.back_layer').get_attribute('id')
            self.driver.find_element_by_id("reqstPurposeCd7").click() 
        except:
            print("용도선택 error")
            1
        self.driver.execute_script('dataOrder();')
        
        '''페이지 넘기며 다운로드 반복'''
        is_done=False

        while(not is_done):
            is_done=self.move_next()
            self.driver.find_element_by_id('checkAll').click() 
            self.driver.execute_script('parameterSettingAndOrder();')
            sleep(0.7)

subtree_list1=['ztree_2_check', #서울특별시
               'ztree_454_check', #부산
               'ztree_676_check'] # 대구

subtree_list2=['ztree_827_check', #인천 
               'ztree_993_check', #광주 
               'ztree_1096_check'] #대전 

subtree_list3=['ztree_1181_check', #울산 
               'ztree_1243_check', #세종 
               'ztree_1266_check'] #경기도 

subtree_list4=['ztree_1865_check',# 강원도 
               'ztree_2077_check', #충청북도 
               'ztree_2245_check'] #충청남도

subtree_list5=['ztree_2470_check', #전라북도
               'ztree_2729_check', #전라남도
               'ztree_3049_check'] #경상북도 

subtree_list6=['ztree_3405_check', #경상남도
               'ztree_3733_check'] #제주

A=KMA(time=60*3,download_path=r'/home/dahye/weathers')
A.setting()
A.download(subtree_list1, '아이디','비밀번호')
A.logout()
A.quit()