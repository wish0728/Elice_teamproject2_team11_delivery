from flask_restx import Resource, Namespace,fields
from flask import request,session

from . import authService

Auth = Namespace(name="auth", description="사용자 인증")
user_fields = Auth.model('User', {
    'id': fields.String(description='a User Id', required=True, example="CCH@naver.com"),
    'name': fields.String(description='name', required=True, example="CCH"),
    'password': fields.String(description='Password', required=True, example="password"),
    'area': fields.String(description='area', required=True, example="경기도 용인시")
})
@Auth.route('/register/<string:id>')
class AuthRegisterCheckId(Resource):
    @Auth.response(200, "Available id")
    @Auth.response(404, "Not found")
    @Auth.response(500, "Unavailable id")
    def get(self,id):
        '''회원가입시 ID유효성 검사'''
        return authService.idckeck(id)

@Auth.route('/register')
class AuthRegister(Resource):
    @Auth.expect(user_fields)
    # @Auth.response(200, "Available id")
    # @Auth.response(500, "Unavailable id")
    def post(self):
        '''회원가입 성공시 DB에 저장'''
        id = request.json['id']
        name = request.json['name']
        password = request.json['password']
        area = request.json['area']
        return authService.userRegister(id,name,password,area)

@Auth.route('/login')
class AuthLogin(Resource):
    @Auth.expect(user_fields)
    @Auth.response(200, "login Success")
    @Auth.response(404, "Not found")
    @Auth.response(500, "login Failed")
    def post(self):
        '''로그인 기능'''
        id = request.json['id']
        password = request.json['password']
        return authService.userLogin(id,password)

@Auth.route('/changepw')
class AuthChangepw(Resource):
    @Auth.expect(user_fields)
    @Auth.response(200, "password Changed")
    @Auth.response(404, "Not found")
    @Auth.response(500, "password change fail")
    def post(self):
        '''유저 비밀번호 변경하기'''
        id = request.json['id']
        name = request.json['name']
        new_password = request.json['password']
        area = request.json['area']
        return authService.changepw(id,name,new_password,area)

@Auth.route('/logout')
class AuthLogout(Resource):
    def post(self):
        '''로그아웃 기능'''
        return authService.userLogout()
