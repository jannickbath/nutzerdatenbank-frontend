FROM alpine

ENV DEBIAN_FRONTEND=noninteractive

COPY . /project
WORKDIR /project

RUN apk update
RUN apk upgrade
RUN apk add python3

RUN npm install
RUN npm run build --configuration=production 

EXPOSE 4200

CMD ["python3", "-m http.server", "--directory", "dist/db-solution/browser", "4200"]