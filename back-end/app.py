from flask  import Flask

app = Flask(__name__)

@app.route('/')
def test():
    return 'test 성공 디버깅 시도 '

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)