@echo off 
setlocal 

:message
set "result="
set /p result=are you run(f/b)?

if "%result%" == "" echo no resultput & goto message 
if /i "%result%" == "f" cd front-end & npm start
@REM if /i "%result%" == "b" cd back-end & python app.py 
if /i "%result%" == "b" cd back-end & python app.py 




