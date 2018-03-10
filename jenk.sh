#!/bin/bash
docker stop jenkins
docker rm jenkins

docker run -d --name jenkins \
  -l "traefik.frontend.whitelistSourceRange=xxx.xxx.xxx.xxx" \
  -l "traefik.backend=jenkins" \
  -l "traefik.frontend.rule=Host:darenyong.com,www.darenyong.com;PathPrefixStrip:/jenkins" \
  -l "traefik.enable=true" \
  -l "traefik.port=8080" \
  --network proxy \
  -e "NODE_ENV=development" \
  my-hello:1.0.0
