# FROM python:3
# WORKDIR /app
# ENV FLASK_APP = app.py
# ENV FLASK_ENV = development
# ENV FLASK_DEBUG = True  
# COPY requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt
# COPY . .
# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
FROM python:3.8-alpine 
COPY . /app 
WORKDIR /app 
RUN pip3 install flask
RUN chmod +x /app/app.py 
CMD ["python3", "app.py"]