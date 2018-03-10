#!/bin/bash
docker stop my-hello
docker rm my-hello

docker run -d --name my-hello \
  -l "traefik.backend=my-hello" \
  -l "traefik.frontend.rule=Host:darenyong.com" \
  -l "traefik.enable=true" \
  -l "traefik.port=8080" \
  --network proxy \
  -p 8080:8080 \
  -e "NODE_ENV=development" \
  my-hello:1.0.0

  #-l "traefik.frontend.rule=PathStrip:/hello" \
