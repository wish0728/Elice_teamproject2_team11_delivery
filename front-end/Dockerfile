FROM node:12.2.0-alpine

# set working directory
WORKDIR /client

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /client/node_modules/.bin:$PATH

# app dependencies, install 및 caching
# COPY package.json /app/package.json
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
# RUN npm install --slient
RUN npm i @nivo/core
RUN npm install react-scripts@3.0.1 -g
COPY . ./
CMD ["npm","run","start"]
# 앱 실행
