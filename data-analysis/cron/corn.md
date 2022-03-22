# ubuntu18.04 crontab 등록하기

isuue : sh,db,py,log 파일등이 모두 홈에 위치하면 잘 동작하는데 위치를 바꾸고 절대경로를 입력하면 잘 동작하지 않는다.

```bash
crontab -e #crontab 등록

#crontab에 작성
#2분마다 실행한다는 뜻. 위치는 절대경로로 적는다.
/2 * * * * /home/dahye/everyday_api.sh >> /home/dahye/cron.log 2>&1

crontab -l #crontab 리스트 확인

cat /var/log/syslog | grep CRON #crontab 동작 로그 확인
```

아래와 같이 작성후 권한을 주어야 한다.

chmod +x everyday_api.sh

```bash
#!/bin/bash
python3 everyday_api.py
timestamp=`date +%Y/%m/%d/%H:%M`
echo "success $timestamp" >> check_test
exit 0
```

실행중 에러가 발생하면 log에 적히고, 성공적으로 실행되면 check_test에 적힌다.

아래는 2분간격으로 자동으로 실행되어 db에 저장된 모습니다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%20cfa0c6fcd4c44a269d463cda6e8694e2/Untitled.png)