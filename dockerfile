FROM alpine

ENV DEBIAN_FRONTEND=noninteractive 

COPY dist/browser /project
WORKDIR /project

RUN apk update
RUN apk upgrade
RUN apk add python3

RUN chmod +x ./start.sh

EXPOSE 4200

CMD python3 -m http.server 4200
