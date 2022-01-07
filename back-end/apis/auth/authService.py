from flask import request,session
from models.user import user
from flask_sqlalchemy import SQLAlchemy
import bcrypt #pip install bcrypt (암호화, 암호일치 확인)
# import pandas as pd 
import sqlite3
db = SQLAlchemy()


# 회원가입 유효성

def idckeck(id:str):
    new_user = user.query.filter_by(id=id).first() # id 가 동일한 유저의 정보 저장
    if new_user: return {"message":"Unavailable id"},500 #결과값이 있다면 = 등록된 유저
    else: return {"message":"Available id"},200
    
# 회원가입 요청
def userRegister(id:str,name:str, password:str, area:str):
    
    encrypted_pw = bcrypt.hashpw(password.encode('utf8'),bcrypt.gensalt())
    new_user = user(id=id, name=name, password=encrypted_pw,area=area) #area도 추후 추가
    db.session.add(new_user)
    db.session.commit()
    return {"message":"User Information saved"},200 #성공

# 로그인
def userLogin(id: str, password:str):
    saved_user = user.query.filter_by(id=id).first()
    #유효하지 않은 ID
    if not saved_user: return{
            "message": "User Not Found"
        }, 404
    # 비밀번호 미일치
    elif not bcrypt.checkpw(password.encode("utf-8"),saved_user.password ):
        return {
            "message": "Auth Failed"
        }, 500
    # 모두 일치
    else: 
        session['login'] = saved_user.id
        return {
            # "message": "login Success ",
            # "area" : saved_user_area,
            "name":saved_user.name,
            "area":saved_user.area
        },200

#비밀번호 변경
def changepw(id,name,new_password,area):
    conn = sqlite3.connect('NaplessRabbit.db')
    cur = conn.cursor()
    
    saved_user = user.query.filter_by(id=id).first()
    sql = "UPDATE user SET password =? WHERE name =?"
    encrypted_pw = bcrypt.hashpw(new_password.encode('utf8'),bcrypt.gensalt())
    if not saved_user: 
        return{
            "message":"User Not Found"
        },404
    elif name != saved_user.name:
        return{
            "message":"User name isn't correct"
        },500
    elif area != saved_user.area:
        return{
            "message":"User area isn't correct"
        },500
    else: 
        cur.execute(sql, (encrypted_pw, saved_user.name))
        conn.commit()
        return {
            "message":"password changed"
        },200

# 로그아웃
def userLogout():
    session.clear()
    return {"message":"logout success"},200


# #회원가입 요청

# @Auth.route('/register/<string:id>/<string:name>/<string:password>/<string:password2>')
# class AuthRegisterSignup(Resource):
#     @Auth.response(200, "Available id")
#     @Auth.response(500, "Unavailable id")
#     def post(self, id, name, password,password2):
#         '''회원가입 성공시 DB에 저장'''
#         # 1차, 2차 비밀번호 검증
#         if password == password2:
#             encrypted_pw = bcrypt.hashpw(password.encode('utf8'),bcrypt.gensalt())
#             new_user = user(id=id, name=name, password=encrypted_pw)
#             db.session.add(new_user)
#             db.session.commit()
#             return {"message":"User Information saved"},200 #성공
#         else: return{"message":"2차 비밀번호를 다시 입력해주십시오"},500 #실패
# 
# 로그인
# @Auth.route('/login/<string:id>/<string:password>')
# class AuthLogin(Resource):
#     @Auth.response(200, "login Success")
#     @Auth.response(404, "Not found")
#     @Auth.response(500, "login Failed")
#     def post(self,id,password):
#         '''로그인 기능'''
#         saved_user = user.query.filter_by(id=id).first()
#         saved_user_pw = saved_user.password
#         # encrypted_pw = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
#         #유효하지 않은 ID
#         if not user: return{
#                 "message": "User Not Found"
#             }, 404
#         # 비밀번호 미일치
#         elif not bcrypt.checkpw(password.encode("utf-8"),saved_user_pw):
#             return {
#                 "message": "Auth Failed"
#             }, 500
#         # 모두 일치
#         else: return {
#                 "message": "login Success"
#             }, 200
