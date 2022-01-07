FROM python:3.7-slim

COPY requirements.txt /app/
WORKDIR /app

RUN pip install --upgrade pip \
    &&  pip install --requirement requirements.txt

COPY . .
EXPOSE 5000
RUN python app.py 

# FROM python:3.8-alpine 

# WORKDIR /app

# COPY requirements.txt requirements.txt 
# RUN python -m pip install --upgrade pip
# RUN pip3 install -r requirements.txt 

# COPY . .


