#!/bin/bash

export GIT_USER=
export GIT_PASSWORD=
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

# export REDIS_ADDR=192.168.99.100
export POSTGRES_ROOT_PASSWORD=
export POSTGRES_PORT=5432
export API_PORT=1338
export BASE_URL=http://ming-web:80
export API_URL=http://ming-api:80

docker-compose up
