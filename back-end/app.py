from flask  import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment

import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    api = Api(app)

    app.config.from_object(config) # config 에서 가져온 파일을 사용합니다.
    
    db.init_app(app) # SQLAlchemy 객체를 app 객체와 이어줍니다.
    Migrate().init_app(app, db)

    app.secret_key = "secret"
    app.config['SESSION_TYPE'] = 'filesystem'
    
    return app

if __name__ == "__main__":
    create_app().run(host='0.0.0.0', debug=True, port=3333)
