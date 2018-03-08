#!/bin/bash

docker run -d --name myhello \
  -p 8080:8080 \
  -e "NODE_ENV=development" \
  my-hello:1.0.0
