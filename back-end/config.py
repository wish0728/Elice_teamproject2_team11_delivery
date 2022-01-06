import os

BASE_DIR = os.path.dirname(__file__) # 폴더 구조가 달라져도, 현재 폴더를 가져와서 사용할 수 있도록 설정합니다.

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'NaplessRabbit.db')) #vscode에서 볼 수 있음
                    #통신방식              #패스워드는 snuggle
# SQLALCHEMY_BINDS = "mysql+pymysql://root:snuggle@127.0.0.1:3306/Library" #터미널에서 mariadb에 접속해서도 보고싶음

SQLALCHEMY_TRACK_MODIFICATIONS = False
