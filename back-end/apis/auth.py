from flask import jsonify, request
from flask_restx import Resource, Api, Namespace,fields
from models import user
from flask_sqlalchemy import SQLAlchemy
import pandas as pd 
import jwt #pip install PyJWT (암, 복호화 확인)
import bcrypt #pip install bcrypt (암호화, 암호일치 확인)

db = SQLAlchemy()

Auth = Namespace(name="auth", description="사용자 인증")


users = []

# 회원가입 유효성
@Auth.route('/register/<string:id>')
class AuthRegisterCheckId(Resource):
    @Auth.response(200, "Available id")
    @Auth.response(404, "Not found")
    @Auth.response(500, "Unavailable id")
    
    def get(self,id):
        '''회원가입시 ID유효성 검사'''
        new_user = user.query.filter_by(id=id).first()
        if new_user: return {"message":"Unavailable id"},500
        else: return {"message":"Available id"},200
#회원가입 요청

@Auth.route('/register/<string:id>/<string:name>/<string:password>')
class AuthRegisterSignup(Resource):
    
    def post(self, id, name, password):
        '''회원가입 성공시 DB에 저장'''
        encrypted_pw = bcrypt.hashpw(password.encode('utf8'),bcrypt.gensalt())
        new_user = user(id=id, name=name, password=encrypted_pw)
        db.session.add(new_user)
        db.session.commit()

# 로그인
@Auth.route('/login/<string:id>/<string:password>')
class AuthLogin(Resource):
    @Auth.response(200, "login Success")
    @Auth.response(404, "Not found")
    @Auth.response(500, "login Failed")
    def post(self,id,password):
        '''로그인 기능'''
        new_user = user.query.filter_by(id=id).first()
        user_pw = new_user.password
        encrypted_pw = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        #유효하지 않은 ID
        if not user: return{
                "message": "User Not Found"
            }, 404
        # 비밀번호 미일치
        elif not bcrypt.checkpw(password.encode("utf-8"),user_pw):
            return {
                "message": "Auth Failed"
            }, 500
        # 모두 일치
        else: return {
            }, 200


# #확인
# @Auth.route('/get')
# class AuthGet(Resource):
#     @Auth.doc(responses={200: 'Success'})
#     @Auth.doc(responses={404: 'Login Failed'})
#     def get(self):