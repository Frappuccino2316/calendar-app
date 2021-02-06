FROM python:3.9.1
WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt
ADD . /code/
