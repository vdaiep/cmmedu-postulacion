FROM python:3.9.6
LABEL maintainer "Vicente Daie Pinilla <vdaiep@gmail.com>"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN mkdir /cmmedu
COPY . /cmmedu
WORKDIR /cmmedu

# Dependencies
RUN pip install -r requirements.txt

# Port
EXPOSE 8585
