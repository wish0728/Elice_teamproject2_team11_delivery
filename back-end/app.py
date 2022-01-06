# -*- coding: utf-8 -*-
from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
from flask_cors import CORS
# from db_connect import db

# import config
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

import os

BASE_DIR = os.path.dirname(__file__) # 폴더 구조가 달라져도, 현재 폴더를 가져와서 사용할 수 있도록 설정합니다.

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'NaplessRabbit.db')) #vscode에서 볼 수 있음
                    #통신방식              #패스워드는 snuggle
# SQLALCHEMY_BINDS = "mysql+pymysql://root:snuggle@127.0.0.1:3306/Library" #터미널에서 mariadb에 접속해서도 보고싶음

SQLALCHEMY_TRACK_MODIFICATIONS = False

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    #일단 services로 대체 -> 후에 resolver로 하기 
    from apis.delivery.deliveryResolver import Deliveryfreq
    from apis.auth.auth import Auth
    # from apis.auth.authResolver import Auth
    from apis.map.mapResolver  import Map
    app.config.from_object(config)  # config 에서 가져온 파일을 사용합니다.

    db.init_app(app)  # SQLAlchemy 객체를 app 객체와 이어줍니다.
    Migrate().init_app(app, db)

    app.secret_key = "secret"
    app.config['SESSION_TYPE'] = 'filesystem'

    

    # from . import models
    api = Api(app)
    api.add_namespace(Deliveryfreq, '/delivery')
    api.add_namespace(Auth, '/auth')
    api.add_namespace(Map, '/map')

    return app


if __name__ == "__main__":
    create_app().run(host='0.0.0.0', debug=True, port=5000)
