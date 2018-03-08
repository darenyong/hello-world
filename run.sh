#!/bin/bash
docker stop myhello
docker rm -v -f myhello
docker rmi my-hello:1.0.0

docker run -d --name myhello \
  -p 8080:8080 \
  -e "NODE_ENV=development" \
  my-hello:1.0.0
