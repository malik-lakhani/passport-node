FROM node:6-alpine

EXPOSE 3000

RUN \
 apk add --no-cache --virtual=build-dependencies \
  curl \
  tar && \
 apk add --no-cache \
  bash \
  make
  
# Setup Webapp
RUN mkdir app
ADD ./package.json /app/package.json
ADD ./npm-shrinkwrap.json /app/npm-shrinkwrap.json

WORKDIR /app
RUN npm install

ADD ./ /app
CMD [ "npm", "run", "dev" ]
