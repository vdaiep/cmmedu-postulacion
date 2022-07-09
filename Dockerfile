FROM python:3.9.6
LABEL maintainer "Vicente Daie Pinilla <vdaiep@gmail.com>"

RUN mkdir /app
COPY . /app
WORKDIR /app

# Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Port
EXPOSE 8585
