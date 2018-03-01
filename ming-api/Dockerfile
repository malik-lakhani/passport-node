FROM node:6-alpine

RUN apk add --no-cache --update \
    bash \
    git

RUN mkdir -p /app

ADD ./package.json /app/package.json

WORKDIR /app/
RUN npm install --production -q

ADD ./ /app/
#Comando que inicia
CMD [ "npm", "start" ]
