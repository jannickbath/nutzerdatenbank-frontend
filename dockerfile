FROM node:19

ENV DEBIAN_FRONTEND=noninteractive 

COPY . /project

WORKDIR /project

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0
