#!/bin/bash


docker run -d --name my-hello \
  -p 8080:8080 \
  -e "NODE_ENV=development" \
  my-hello:1.0.0
