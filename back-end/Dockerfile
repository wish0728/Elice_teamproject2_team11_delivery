FROM python:3.7-slim

COPY requirements.txt /app/
EXPOSE 5000
WORKDIR /app

RUN pip3 install --upgrade pip \
    &&  pip3 install --requirement requirements.txt

COPY . .

CMD ["python3", "app.py"]

# FROM python:3.8-alpine 

# WORKDIR /app

# COPY requirements.txt requirements.txt 
# RUN python -m pip install --upgrade pip
# RUN pip3 install -r requirements.txt 

# COPY . .


